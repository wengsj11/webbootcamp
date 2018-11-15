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

/* 班级成员选项卡事件 */
let memberTabs = document.querySelectorAll('.mem-tab__item');
let teacherList = document.querySelector('.mem-list--teacher');
let studentList = document.querySelector('.mem-list--student');
let parentList = document.querySelector('.mem-list--parent');

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