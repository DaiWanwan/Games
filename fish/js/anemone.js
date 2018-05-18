/**
 * Created by anthony on 2018/4/3.
 */
//  海葵
var aneObj = function () {
    this.rootX=[];
    this.headX=[];
    this.headY=[];
    this.Alpha=0;
    this.amp=[];
    // this.x = [];
    // this.y = [];
};
aneObj.prototype.num = 50;
aneObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.rootX[i] = i*16 + Math.random() * 20;
        this.headX[i]=this.rootX[i];
        this.headY[i]=canHeight-220+Math.random() * 50;
        this.amp[i]=Math.random()*30+50;
        // this.x[i] = i*20 + Math.random() * 20;
        // this.y[i] = 200 + Math.random() * 50;
    }
};
aneObj.prototype.draw = function () {
    this.Alpha +=deltaTme*0.0006;
    var l=Math.sin(this.Alpha);  //  [-1,1]
    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth = 20;   //   线的宽度
    ctx2.lineCap = 'round';  //  线的尾部处理，圆顶形
    ctx2.strokeStyle = '#3b154e';  // 线颜色
    for (var i = 0; i < this.num; i++) {
        ctx2.beginPath();  // 开始路径
        ctx2.moveTo(this.rootX[i], canHeight);  // 末尾路径
        this.headX[i]=this.rootX[i]+l*this.amp[i];
        //  设置海葵的摆动
        ctx2.quadraticCurveTo(this.rootX[i],canHeight - 100,this.headX[i],this.headY[i]);   //  画线，正弦曲线
        ctx2.stroke();
    }
    ctx2.restore();
};