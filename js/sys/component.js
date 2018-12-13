/* 
 *  ui-component script.
 *  表单ui组件事件脚本
 *
*/

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
let radios = document.querySelectorAll('.c-radio');
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener('click', (event) => {
        // debugger;
        let radioed = event.currentTarget;
        let siblings = event.currentTarget.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList && siblings[i].classList.remove('c-radio--radioed');
        }
        radioed.classList.add('c-radio--radioed');
        radioed.previousSibling.previousSibling.checked = true;
    }, false);
}
/* 多选框事件 */
let checkbox = document.querySelectorAll('.c-checkbox');
for (let i = 0; i < checkbox.length; i++) {
    checkbox[i].addEventListener('click', (event) => {
        let checked = event.currentTarget;
        if (checked.classList.contains('c-checkbox--checked')) {
            checked.classList.remove('c-checkbox--checked');
        } else {
            checked.classList.add('c-checkbox--checked');
            checked.previousSibling.previousSibling.checked = true;
        }
    },false);
}