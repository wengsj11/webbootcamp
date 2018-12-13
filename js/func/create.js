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
    // 添加loading 小图标
    $('form button[type=submit]').after('<span class="loading loading--small"></span>')

    // 校验数据
    if (!validate(formdata)) {
        $('.loading').remove(); //隐藏加载图标
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
        data: JSON.stringify(classItem),
        error: (XMLHttpRequest, textStatus, errorThrown) => {
            $('.loading').remove(); //隐藏加载图标
            $('form button[type=submit]').after('<span class="o-text--error">提交失败!</span>')
        }
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
        success: (response) => {
            location.href = './index.html';
        }
    });
    return false;
});

/* 校验数据 */
const validate = (data) => {
    $('.c-form-input').find('.o-text--error').remove(); //删除所有错误信息
    let validated = true;
    if (!data["grade"] || data["grade"].length == 0) {
        $('input[name=grade]').after('<span class="o-text--error">年段不能为空</span>')
        validated = false;
    }
    if (!data["year"] || data["year"].length == 0) {
        $('input[name=year]').after('<span class="o-text--error">年级不能为空</span>')
        validated = false;
    }
    if (!Boolean(data["className"].match(/^[^_%]{0,20}$/g))) {
        $('input[name=className]').after('<span class="o-text--error">班级名称限20个字符，不支持输入_和%</span>')
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
