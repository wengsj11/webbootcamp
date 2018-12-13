/* 
    获取班级成员数据
*/

class MemberItem {
    constructor (props = {}) {
        this.props = props
    }
    render() {
        return `
        <div class="mem-list__item">
            <div class="mem-item__pic">
                <img src=".${this.props.avatar}"></img>
                ${ parseTagsString(this.props.type, this.props.tags) }
            </div>
            <div class="mem-item__name"><strong>${this.props.name}</strong></div>
        </div>
        `
    }
}
const parseTagsString = (type, tags) => {
    // 没有标签则返回空
    if (!tags) {
        return '';
    }
    let tagsString = '<div class="mem-tag-box">';
    for (let i = 0; i < tags.length; i++) {
        if (tags[i] == '班主任') {
            tagsString += '<span class="mem-tag mem-tag--headteacher">班主任</span>'
        } else if (tags[i] == '管理员'){
            tagsString += '<span class="mem-tag mem-tag--admin">管理员</span>'
        } else if (tags[i] == '班长') {
            tagsString += '<span class="mem-tag mem-tag--moniter">班长</span>'
        } else {
            tagsString += `<span class="mem-tag mem-tag--${type}">${tags[i]}</span>`
        }
    }
    tagsString += '</div>';
    return tagsString;
}
/*  插入班级成员tabs */
const insertTabs = (list) => {
    $('.mem-tab').html(''); //清空tab
    //根据成员数量添加三种选项卡tab
    for (const type in list) {
        if (list.hasOwnProperty(type)) {
            // if (list[type].length > 0) {
                // 插入选项卡
                $('.mem-tab').append(`
                    <li class="mem-tab__item mem-tab__item--${type}">
                        所有${
                            type == 'teacher' ? '老师': (type == 'student' ? '学生' : '家长')
                        }（${list[type].length}）
                    </li>
                `);
            // }
        }
    }
}

/* 监听tabs切换，插入成员数据 */
const tabSwitch = (list) => {
    for (const type in list) {
        if (list.hasOwnProperty(type)) {
            $(`.mem-tab__item--${type}`).on('click', function (e) {
                currTab = type;
                $.each($('.mem-tab__item'), function (index, item) { 
                    $(item).removeClass('ui-active');
                });
                $(this).addClass('ui-active');
                //清空list数据
                $('.mem-list').html(''); 
                // 插入班级成员
                $.each(list[type], function (index, item) { 
                    let memberItem = new MemberItem(item);
                    $('.mem-list').append(memberItem.render());
                });
            });
        }
    }
}

const renderMembers = () => {
    /* 给每个listitem添加onclick事件 */
    $('.cl-content').on('click', '.cl-list-item', function (event) {
        GLOBAL.list = {
            teacher: [],
            student: [],
            parent: []
        }; // 数据置空
        let id = $(this).attr('id');
        // 根据班级id获取班级成员数据
        $.getJSON("http://localhost:3003/members", (data, textStatus, jqXHR) => {
            const classData = data.find(item => { return item.class_id == id }); //班级数据
            let members = []; //成员数据
            // console.log(classData);
            if (classData) {
                // 如果有数据，获取members数组数据
                members = classData.data;
                // 替换页面班级名
                $('.mem-class-name').html(classData.class_name);
            }
            for (let i = 0; i < members.length; i++) {
                if (members[i].type == 'teacher') {
                    GLOBAL.list["teacher"].push(members[i]);
                } else if (members[i].type == 'student') {
                    GLOBAL.list["student"].push(members[i]);
                } else if (members[i].type == 'parent') {
                    GLOBAL.list["parent"].push(members[i]);
                }
            }
            // 插入tab选项卡
            insertTabs(GLOBAL.list);

            //监听tab选项卡切换
            tabSwitch(GLOBAL.list);

            //点击第一个tab
            $(`.mem-tab__item--teacher`).click();

            //显示班级成员页面
            $('.l-main__bd').addClass('content-hide');
            $('.mem-content').toggleClass('content-hide');
            // 右上角按钮组件
            $('.o-main-btns').toggleClass('content-hide');
        });
    });
    
    /* 成员名字模糊查询 */
    $('.o-search .o-search-btn').on('click', function (e) {
        let value = $('.o-search__input').val();
        //清空list数据
        $('.mem-list').html(''); 
        // 插入班级成员
        $.each(GLOBAL.list[currTab], function (index, item) { 
            let name = item.name;
            let pinyin = chineseToPinYin(item.name); // 拼音
            if(name.indexOf(value) != -1 || pinyin == value || pinyin[0] == value){
                let memberItem = new MemberItem(item);
                $('.mem-list').append(memberItem.render());
            }
        });
    });
    //监听input输入
    // $('.o-search .o-search__input').bind('input propertychange', function() {
    //     let value = $(this).val();
    //     console.log(value);
    // });
        
}

renderMembers();

// export { renderMembers }