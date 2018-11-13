let mainContents = document.querySelectorAll('.l-main__bd');
let mainBtnGroup1 = document.getElementById('main-btn-group1');
let mainBtnGroup2 = document.getElementById('main-btn-group2');

let clListItem = document.getElementsByClassName('cl-list-item');
let createBtn = document.getElementById('create-btn');
let backBtn = document.getElementById('back-btn');

/* 主体内容切换 */
for (let i = 0; i < clListItem.length; i++) {
    clListItem[i].onclick = () => {
        for (let i = 0; i < mainContents.length; i++) {
            mainContents[i].classList.add('content-hide');
        }
        let memberContent = document.querySelector('.mem-content');
        memberContent.classList.remove('content-hide');
        mainBtnGroup1.classList.add('content-hide');
        mainBtnGroup2.classList.remove('content-hide');
    }
}
createBtn.onclick = () => {
    for (let i = 0; i < mainContents.length; i++) {
        mainContents[i].classList.add('content-hide');
    }
    let createContent = document.querySelector('.cr-content');
    createContent.classList.remove('content-hide');
    mainBtnGroup1.classList.add('content-hide');
    mainBtnGroup2.classList.remove('content-hide');
}
backBtn.onclick = () => {
    for (let i = 0; i < mainContents.length; i++) {
        mainContents[i].classList.add('content-hide');
    }
    let classContent = document.querySelector('.cl-content');
    classContent.classList.remove('content-hide');
    mainBtnGroup2.classList.add('content-hide');
    mainBtnGroup1.classList.remove('content-hide');
}

/* 下拉框事件 */
let selectInput = document.querySelectorAll('.c-select__title .c-input');
let selectDom = null; // 保存选中的下拉框DOM
for (let i = 0; i < selectInput.length; i++) {
    selectInput[i].addEventListener('click', (event) => {
        event.stopPropagation();
        let select = event.target.parentNode.parentNode;
        if (!selectDom) {
            selectDom = event.target;
            select.classList.add('c-select--selected');
            return;
        } else {
            selectDom.parentNode.parentNode.classList.remove('c-select--selected');
        }
        // 判断点击的是同一个下拉框还是其他下拉框
        if (event.target === selectDom) {
            selectDom = null;
        } else {
            selectDom = event.target;
            select.classList.add('c-select--selected');
        }
    }, false);
}
//设置点击除下拉框外的元素触发隐藏
document.body.addEventListener('click', (event) => {
    if (selectDom) {
        selectDom.parentNode.parentNode.classList.remove('c-select--selected');
        selectDom = null;
    }
});
// 下拉框点击选择
let options = document.querySelectorAll('.c-select-items dd');
for (let i = 0; i < options.length; i++) {
    options[i].addEventListener('click', (event) => {
        selectDom.value = event.target.innerHTML;
    })
}

/* 单选框事件 */
let radioInput = document.querySelectorAll('.c-radio');
for (let i = 0; i < radioInput.length; i++) {
    radioInput[i].addEventListener('click', (event) => {
        // debugger;
        let radios = event.currentTarget.parentNode.childNodes;
        for (let i = 0; i < radios.length; i++) {
            radios[i].classList && radios[i].classList.remove('c-radio--radioed');
        }
        event.currentTarget.classList.add('c-radio--radioed');
    },false)    
}

/* 班级成员选项卡事件 */
let memberTabs = document.querySelectorAll('.mem-tab__item');
let teacherList = document.querySelector('.mem-list--teacher')
let studentList = document.querySelector('.mem-list--student')
let parentList = document.querySelector('.mem-list--parent')

// 老师选项卡
memberTabs[0].onclick = () => {
    for (let i = 0; i < memberTabs.length; i++) {
        memberTabs[i].classList.remove('ui-active');
    }
    memberTabs[0].classList.add('ui-active');
    teacherList.classList.remove('content-hide');
    studentList.classList.add('content-hide');
    parentList.classList.add('content-hide');
}
// 学生选项卡
memberTabs[1].onclick = () => {
    for (let i = 0; i < memberTabs.length; i++) {
        memberTabs[i].classList.remove('ui-active');
    }
    memberTabs[1].classList.add('ui-active');
    teacherList.classList.add('content-hide');
    studentList.classList.remove('content-hide');
    parentList.classList.add('content-hide');
}
// 家长选项卡
memberTabs[2].onclick = () => {
    for (let i = 0; i < memberTabs.length; i++) {
        memberTabs[i].classList.remove('ui-active');
    }
    memberTabs[2].classList.add('ui-active');
    teacherList.classList.add('content-hide');
    studentList.classList.add('content-hide');
    parentList.classList.remove('content-hide');
}