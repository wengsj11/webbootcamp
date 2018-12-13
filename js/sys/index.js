/* 
    主脚本
*/
$(document).ready(function () {
    /* 跳转至加入页 */
    $('#join-btn').on('click', function () {
        // console.log('join')
    });
    /* 跳转至表单页 */
    $('#create-btn').on('click', function () {
        $('.l-main__bd').addClass('content-hide');
        $('.cr-content').toggleClass('content-hide');
        // 右上角按钮组件
        $('.o-main-btns').toggleClass('content-hide');
    });
    
    /* 返回上级 */
    $('#back-btn').on('click', function () {
        // $('.l-main__bd').addClass('content-hide');
        // $('.cl-content').toggleClass('content-hide');
        // // 右上角按钮组件
        // $('.o-main-btns').toggleClass('content-hide');
        location.href = './index.html';
    });
});
