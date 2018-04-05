/**
 * Created by anthony on 2018/4/3.
 */
var childObj=function () {
    this.x=0;
    this.y=0;
    this.angle=0;
    this.live=300;
    // this.babyEye=new Image();
    // this.babyBody=new Image();
    // this.babyTail=new Image();
    this.babyTailTimer=0;
    this.babyTailCount=0;
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyeIntervar=1000;
    this.babyBodyTimer=0;
    this.babyBodyCount=0;

};
childObj.prototype.init=function () {
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5-50;
    this.angle=0;
};
childObj.prototype.draw=function () {
        this.x=lerpDistance(mum.x,this.x,0.99);
        this.y=lerpDistance(mum.y,this.y,0.99);
        var deltaX=mum.x-this.x;
        var deltaY=mum.y-this.y;
        var beta=Math.atan2(deltaY,deltaX)+Math.PI;
        this.angle=lerpAngle(beta,this.angle,0.7);

        //  尾巴摆动
        this.babyTailTimer +=deltaTme;
        if(this.babyTailTimer>50){
            this.babyTailCount=(this.babyTailCount +1)%8;
            this.babyTailTimer  %=50
        }
        // 眨眼睛
        this.babyEyeTimer +=deltaTme;
        if(this.babyEyeTimer>this.babyEyeIntervar){
            this.babyEyeCount=(this.babyEyeCount +1)%2;
            this.babyEyeTimer  %=this.babyEyeIntervar;
            if(this.babyEyeCount==0){
                this.babyEyeIntervar=Math.random()*2000+2000;
            }else {
                //  眨眼睛
                this.babyEyeIntervar=200;
            }
        }
    if(data.start && !data.gameOver){
        //  身体变化
        this.babyBodyTimer +=deltaTme;
        if(this.babyBodyTimer>this.live){
            this.babyBodyCount=this.babyBodyCount +1;
            this.babyBodyTimer %=this.live;
            if(this.babyBodyCount>=19){
                this.babyBodyCount=19;  //  游戏结束
                data.stopGame();
            }
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);  //  规定原点
    ctx1.rotate(this.angle);
    var tailCount=this.babyTailCount;
    var eyeCount=this.babyEyeCount;
    var bodyCount=this.babyBodyCount;
    ctx1.drawImage(childTail[tailCount],-childTail[tailCount].width*0.5+25,-childTail[tailCount].height*0.5);
    ctx1.drawImage(childBody[bodyCount],-childBody[bodyCount].width*0.5,-childBody[bodyCount].height*0.5);
    ctx1.drawImage(childEye[eyeCount],-childEye[eyeCount].width*0.5,-childEye[eyeCount].height*0.5);
    ctx1.restore();
};