/**
 * Created by anthony on 2017/12/12.
 */
//    “返回顶部“的出现和隐藏,点击时回到博客首端
window.onresize=resizeBannerImage;//当窗口改变宽度时执行此函数
function resizeBannerImage() {
    if( $(window).width() > 992 && $(window).scrollTop()>920) {
        $('.return-top').show(1000);
    }else {
        $('.return-top').hide(300);
    }
}
$(window).scroll(function(){   //当窗口滑动到某一位置执行
    var _width = $(window).width();
    if($(window).scrollTop()>200 && _width > 992) {
        $('.return-top').show(1000);

    } else {
        $('.return-top').hide(300);
    }
});
$(".return-top").click(function () {
    $("html, body").animate({
        scrollTop: $("header").offset().top }, {duration: 600,easing: "swing"});
    return false;
});