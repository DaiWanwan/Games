/**
 * Created by anthony on 2017/9/11.
 */

$(document).ready(function() {

// 导航栏的提示框
        var delay = {"show": 800, "hide": 800};
        $('[data-toggle="tooltip"]').tooltip(delay);


        //    音乐的播放和暂停
        var music = document.getElementById("bgMusic");
        $(".musicControl").click(function(){
            event.stopPropagation();
            if(music.paused){
                music.play();
                $(".musicControl>i").removeClass("fa-play").addClass("fa-pause");
                $(".musicControl+img").removeClass("picture-pause");
            }else{
                music.pause();
                $(".musicControl>i").removeClass("fa-pause").addClass("fa-play");
                $(".musicControl+img").addClass("picture-pause");
            }
        });







//    Mood






});