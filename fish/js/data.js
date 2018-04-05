/**
 * Created by anthony on 2018/4/3.
 */
var dataObj=function () {
    this.fruitNum=0;
    this._double=1;
    this.score=0;
    this.gameOver=true;
    this.Alpha=0;
    this.start=false;
};
// dataObj.prototype.reset=function () {
//     this.fruitNum=0;
//     this._double=1;
//     this.score=0;
// };
dataObj.prototype.draw=function () {
    if(!this.gameOver&& this.start){
        ctx1.fillText('Score: ' +this.score,20,30);
    }
    var w=can1.width;
    var h=can1.height;
    // ctx1.fillText('num: ' +this.fruitNum,w*0.5,h);
    // ctx1.fillText('double: ' +this._double,w*0.5,h);

    ctx1.save();
    ctx1.font = "50px Verdana";
    ctx1.shadowBlur=10;
    ctx1.shadowColor='orange';
    ctx1.textAlign='center';
    if(this.gameOver && this.start){
        this.Alpha +=deltaTme*0.0005;
        if(this.Alpha>1){
            this.Alpha=1;
        }
        ctx1.fillStyle="rgba(255,255,255,"+this.Alpha+")";
        ctx1.fillText('Game Over',w*0.5,h*0.5-100);
        ctx1.fillText('You score: ' +this.score,w*0.5,h*0.5-40);
    }
    ctx1.restore();
};
dataObj.prototype.addScore=function () {
    //  一个黄色果实100分，如果吃到蓝色果实则分数加倍
    //  随着分数的提高，小鱼的生命消耗越快
    //  当将将能量传递给小鱼，则重新大鱼身上的分数重新累计
    //   每当将能量传递给小鱼才会出现分数的增长。
    this.score +=this.fruitNum*10*this._double;
    var step=Math.floor(this.score/500);
    if(step>10){
        step=10;
    }
    if(step>0){
        child.live=Math.floor((300/step)*1.5);
    }
    this.fruitNum=0;
    this._double=1;
};
dataObj.prototype.startGame=function () {
    this.start=true;
    this.gameOver=false;
    this.fruitNum=0;
    this._double=1;
    this.score=0;
    this.Alpha=0;
};
dataObj.prototype.stopGame=function () {
    data.gameOver=true;
    // _control.style.display='block';
    setTimeout(function(){
        _control.style.display='block'
    },1500);
    child.babyBodyCount=0;
    mum.mumBodyCount=0;
};
