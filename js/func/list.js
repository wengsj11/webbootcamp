/* 
    获取班级列表数据脚本
*/

/* 班级item类 */
class ClassItem {
    constructor (props = {}) {
        this.props = props
    }
    render () {
        return `
          <div class="cl-list-item" id="${this.props.id}">
            <img src=".${this.props.img}" alt="班级图片" class="cl-list-item__pic">
            <div class="cl-list-item__info">
                <span class="cl-item__grade">${this.props.classTitle}</span><br />
                班级：<span class="cl-item__classname">${this.props.grade}</span><br />
                班主任：<span class="cl-item__headteacher"><strong>${this.props.headteacher}</strong></span><br />
                学生：<span class="cl-item__student">${this.props.studentNum}人</span>
            </div>
            <button class="o-setting-btn o-btn">
                <i class="o-icon o-icon--setting"></i>
            </button>
            ${this.props.administrative ? '<div class="cl-tag">行政班</div>' : ''}
        </div>
        `
      }
}

/* 获取班级列表dom方法 */
const getClassListDom = (isAdministrative) => {
    let classList = $(`.cl-list-${isAdministrative ? 'admin':'teach'}`);
    if (classList.length <= 0) {
        // 不存在cl-list元素
        if (isAdministrative) {
            //若该班级是行政班
            classList = $('<div></div>').addClass('cl-list cl-list-admin');
            //将班级列表dom插入页面
            $('.cl-content')
                .append('<p class="cl-intro">行政班是为学生管理和教学管理而设置的班级</p>')
                .append(classList);
        } else {
            // 反之是教学班
            classList = $('<div></div>').addClass('cl-list cl-list-teach');
            //将班级列表dom插入页面
            $('.cl-content')
                .append('<p class="cl-intro">教学班是根据课程教学要求而设置的班级</p>')
                .append(classList);
        }
    }
    return classList;
}

/* 渲染班级json数据 */
const renderClassList = () => {
    // 本地localStorage数据
    // let datas = localStorage.getItem("classItems");
    // if (datas) {
    //     $.each(JSON.parse(datas), (index, item) => {
    //         // 创建班级项dom
    //         let classItem = new ClassItem(item);
    //         let classList = getClassListDom(classItem.props.administrative);
    //         // 插入班级项
    //         classList.append(classItem.render());
    //         // 显示班级内容
    //         $('.cl-content').removeClass('content-hide');
    //     });
    // }
    // 本地json数据
    $.ajax({
        type: "GET",
        url: "http://localhost:3003/list",
        async: false,
        success: function (data) {
            GLOBAL.classCount = data.length; // 用于表单增添记录
            $.each(data, (index, item) => {
                let classItem = new ClassItem(item);
                let classList = getClassListDom(classItem.props.administrative);
                // 插入班级项
                classList.append(classItem.render());
                // 显示班级内容
                $('.cl-content').removeClass('content-hide');
                $('.no-content').addClass('content-hide');
            });
        },
        error: function () {
            // 若获取数据失败，则显示未加入班级
            $('.no-content').toggleClass('content-hide');
        }
    });
}

renderClassList();

// export { renderClassList };