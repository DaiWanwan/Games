/**
 * Created by anthony on 2018/4/3.
 */
var mumObj=function () {
    this.x=0;
    this.y=0;
    this.angle;
    // this.bigEye=new Image();
    // this.bigBody=new Image();
    // this.bigTail=new Image();
    this.mumTailTimer=0;
    this.mumTailCount=0;
    this.mumEyeTimer=0;
    this.mumEyeCount=0;
    this.mumEyeIntervar=1000;
    // this.mumBodyTimer=0;
    this.mumBodyCount=0;

};
mumObj.prototype.init=function () {
    this.x=canWidth*0.5;
    this.y=canHeight*0.5-100;
    this.angle=0;
    // this.bigEye.src='./source/bigEye0.png';
    // this.bigBody.src='./source/bigSwim0.png';
    // this.bigTail.src='./source/bigTail0.png';

};
mumObj.prototype.draw=function () {
    this.x=lerpDistance(mx,this.x,0.95);
    this.y=lerpDistance(my,this.y,0.95);
    var deltaX=mx-this.x;
    var deltaY=my-this.y;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    this.angle=lerpAngle(beta,this.angle,0.6);

    this.mumTailTimer +=deltaTme;
    if(this.mumTailTimer>50){
        this.mumTailCount=(this.mumTailCount +1)%8;
        this.mumTailTimer  %=50
    }

    this.mumEyeTimer +=deltaTme;
    if(this.mumEyeTimer>this.mumEyeIntervar){
        this.mumEyeCount=(this.mumEyeCount +1)%2;
        this.mumEyeTimer  %=this.mumEyeIntervar;
        if(this.mumEyeCount==0){
            this.mumEyeIntervar=Math.random()*2000+2000;
        }else {
            //  眨眼睛
            this.mumEyeIntervar=200;
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);  //  规定原点
    ctx1.rotate(this.angle);
    var mumCount=this.mumTailCount;
    var eyeCount=this.mumEyeCount;
    var bodyCount=this.mumBodyCount;
    if(data._double==1){
        ctx1.drawImage(mumBodyOrange[bodyCount],-mumBodyOrange[bodyCount].width*0.5,-mumBodyOrange[bodyCount].height*0.5);
    }else {
        ctx1.drawImage(mumBodyBlue[bodyCount],-mumBodyBlue[bodyCount].width*0.5,-mumBodyBlue[bodyCount].height*0.5);
    }
    ctx1.drawImage(mumTail[mumCount],-mumTail[mumCount].width*0.5+30,-mumTail[mumCount].height*0.5);
    ctx1.drawImage(mumEye[eyeCount],-mumEye[eyeCount].width*0.5,-mumEye[eyeCount].height*0.5);
    ctx1.restore();
};