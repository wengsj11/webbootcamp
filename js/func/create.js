/* 
    添加表单数据
*/

/* 表单提交事件 */
$('.c-form').submit((event) => {
    let formdata = {}; //提交数据
    let inputs = $(event.target).serializeArray()
    $.each(inputs, function (i, value) {
        formdata[this.name] = this.value;
    });
    // 校验数据
    if (!validate(formdata)) {
        return false;
    }
    // 存入localStorage
    // if (!localStorage.getItem("classItems")) {
    //     localStorage.setItem("classItems",JSON.stringify([]));
    // }
    // let datas = localStorage.getItem("classItems");
    // let itemArray = JSON.parse(datas);
    // itemArray.push(toClassItem(formdata));
    // localStorage.setItem("classItems",JSON.stringify(itemArray));

    // 存储至本地json文件
    let classItem = toClassItem(formdata);
    $.ajax({
        url: 'http://localhost:3003/list',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(classItem)
    });
    $.ajax({
        url: 'http://localhost:3003/members',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "id": classItem.id,
            "class_id": classItem.id,
            "class_name": classItem.className,
            "data": []
        }),
        success: () => {
            location.href = './index.html';
        }
    });
    return false;
});

/* 校验数据 */
const validate = (data) => {
    let validated = true;
    if (!data["grade"] || data["grade"].length == 0) {
        alert('年段不能为空');
        validated = false;
    }
    if (!data["year"] || data["year"].length == 0) {
        alert('年级不能为空');
        validated = false;
    }
    if (data["className"].indexOf('_') != -1 || data["className"].indexOf('%') != -1 || data["className"].length > 20) {
        alert('班级名称，限20个字符，不支持输入_和%');
        validated = false;
    }
    return validated;
}

/* 表单数据转为班级项 */
const toClassItem = (formdata) => {
    let item = {
        "id": GLOBAL.classCount + 1,
        "school": formdata.school,
        "classTitle": formdata.grade,
        "grade": formdata.year,
        "className": formdata.className,
        "headteacher": "暂未设置",
        "studentNum": 0,
        "administrative": formdata.type=='行政班' ? true:false,
        "img": formdata.type=='行政班' ? "/images/class_work.png" : "/images/class_crown.png"
    }
    return item;
}
