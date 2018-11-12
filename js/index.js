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

/* 下拉框 */
let selectInput = document.querySelectorAll('.c-select__title .c-input');
for (let i = 0; i < selectInput.length; i++) {
    selectInput[i].onclick = () => {
        let select = selectInput[i].parentNode.parentNode;
        select.classList.add('c-select--selected');
    }
}
document.body.addEventListener('click', (event) => {
    let selected = document.querySelector('.c-select--selected .c-input');
    if (selected && selected != event.target) {
        console.log('aa1');
        selected.parentNode.parentNode.classList.remove('c-select--selected');
    }    
})
