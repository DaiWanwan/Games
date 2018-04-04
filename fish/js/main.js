/**
 * Created by anthony on 2018/4/2.
 */
var can1,
    can2;
var ctx1,
    ctx2;
var lastTime,
    deltaTme;
var bgPic = new Image();
var canWidth,
    canHeight;
var ane,
    fruit;
var mum,
    child;

var mx,
    my;

var childTail=[],
    childEye=[],
    childBody=[];
var mumTail=[],
    mumEye=[],
    mumBodyOrange=[],
    mumBodyBlue=[];

var data;
var wave;
var dust;
var dustPic=[];
var _control=document.querySelector('.control');
var _btn=document.querySelector('.btn');
document.body.onload = function(){

    _btn.addEventListener('click',startGame,false);
    game();
};
function startGame() {
   _control.style.display= 'none';
   data.startGame();
}

function game() {
    init();
    lastTime = Date.now();
    deltaTme = 0;
    gameLoop();
}
function init() {
//     获取canvas场景
//     canvas1在前，canvas2在后面
    can1 = document.getElementById('canvas1');//  鱼，食物，特效
    can2 = document.getElementById('canvas2');// 背景，海葵，星星
    ctx1 = can1.getContext('2d');
    ctx2 = can2.getContext('2d');
    ctx1.fillStyle='white';
    ctx1.font = "20px Verdana";
    ctx1.textAlign='left';
    can1.addEventListener('mousemove',onMouseMove,false);

    bgPic.src = './source/background.jpg';
    canWidth = can1.width;
    canHeight = can1.height;
    //  海葵
    ane = new aneObj();
    ane.init();
    //  食物
    fruit=new fruitObj();
    fruit.init();
    //  大鱼
    mum=new mumObj();
    mum.init();
    //  大鱼尾巴
    for(var i=0;i<8;i++){
        mumTail[i]= new Image();
        mumTail[i].src='./source/bigTail'+i+'.png';
    }
    // 大鱼眼睛
    for(var i=0;i<2;i++){
        mumEye[i]= new Image();
        mumEye[i].src='./source/bigEye'+i+'.png';
    }
    //  大鱼身体
    for(var i=0;i<8;i++){
        mumBodyOrange[i]= new Image();
        mumBodyBlue[i]= new Image();
        mumBodyOrange[i].src='./source/bigSwim'+i+'.png';
        mumBodyBlue[i].src='./source/bigSwimBlue'+i+'.png';
    }
    //  小鱼
    child=new childObj();
    child.init();
    //  鼠标位置
    mx=canWidth*0.5;
    my=canHeight*0.5-100;
    //  小鱼尾巴
    for(var i=0;i<8;i++){
        childTail[i]= new Image();
        childTail[i].src='./source/babyTail'+i+'.png';
    }
    // 小鱼眼睛
    for(var i=0;i<2;i++){
        childEye[i]= new Image();
        childEye[i].src='./source/babyEye'+i+'.png';
    }
    //  小鱼身体
    for(var i=0;i<20;i++){
        childBody[i]= new Image();
        childBody[i].src='./source/babyFade'+i+'.png';
    }
    data=new dataObj();
    wave=new waveObj();
    wave.init();
    //  悬浮物
    for(var i=0;i<7;i++){
        dustPic[i]= new Image();
        dustPic[i].src='./source/dust'+i+'.png';
    }
    dust=new dustObj();
    dust.init();
}
//  不断刷新
function gameLoop() {
    requestAnimFrame(gameLoop);  // 一个API，根据实际计算时间智能加载
    var now = Date.now();
    deltaTme = now - lastTime;
    lastTime = now;
    if(deltaTme>40){
        deltaTme=40;
    }
    drawBackground();
    ane.draw();
    fruit.draw();
    fruitMonitor();
    ctx1.clearRect(0,0,canWidth,canHeight);
    mum.draw();
    momFruitcollision();
    momBadycollision();
    child.draw();
    data.draw();
    wave.draw();
    dust.draw();
}

function onMouseMove(e){
    if(!data.gameOver){
        if(e.offsetX||e.layerX){
            mx=e.offsetX==undefined?e.layerX:e.offsetX;
            my=e.offsetY==undefined?e.layerY:e.offsetY;
        }
    }
}
function drawBackground() {
    ctx2.drawImage(bgPic,0,0,canWidth,canWidth);
}