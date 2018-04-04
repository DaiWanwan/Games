/**
 * Created by anthony on 2018/4/4.
 */
var dustObj=function () {
    this.x=[];
    this.y=[];
    this.amp=[];
    this.number=[];
    this.Alpha=0;
};
dustObj.prototype.num=20;
dustObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        this.x[i]=Math.random()*canWidth;
        this.y[i]=Math.random()*canHeight;
        this.amp[i]=20+Math.random()*25;
        this.number[i]=Math.floor(Math.random()*7);
    }
    this.Alpha=0;
};
dustObj.prototype.draw=function () {
    this.Alpha +=deltaTme*0.0006;
    var l=Math.sin(this.Alpha);  //  [-1,1]
    for(var i=0;i<this.num;i++){
        var no=this.number[i];
        ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i])
    }
};