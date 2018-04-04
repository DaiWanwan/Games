/**
 * Created by anthony on 2018/4/3.
 */
var fruitObj = function () {
    this.alive = [];  //  是否或者，布尔值
    this.x=[];  //  果实位置
    this.y=[];
    this.aneNum=[];
    this.l=[];
    this.spd=[];
    this.type=[];   // 果实颜色
    this.orange=new Image();
    this.blue=new Image();
};
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function () {
    for (var i = 0; i < this.num; i++) {
        this.alive[i] = false;
        this.x[i]=0;
        this.y[i]=0;
        this.l[i]=0;
        this.aneNum[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;
        this.type[i]='';
    }
    this.orange.src='./source/fruit.png';
    this.blue.src='./source/blue.png';
};
fruitObj.prototype.draw = function (){
    var pic;
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            if(this.type[i]=='blue'){
                pic=this.blue;
            }else {
                pic=this.orange;
            }
            if(this.l[i]<=14){
                var no=this.aneNum[i];
                this.x[i]=ane.headX[no];
                this.y[i]=ane.headY[no];
                this.l[i] +=this.spd[i]*deltaTme;
                // ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            }else {

                this.y[i] -=this.spd[i]*5*deltaTme;

            }
            ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            if(this.y[i]<-10){
                this.alive[i]=false;
                // console.log('a');
            }
        }
    }
};
fruitObj.prototype.born=function (i) {
    // var aneID= Math.floor(Math.random()*ane.num); // 随机找到一个对应的海葵
    this.aneNum[i]=Math.floor(Math.random()*ane.num);
    this.x[i]=ane.headX[this.aneNum[i]];
    this.y[i]=ane.headY[this.aneNum[i]];
    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.2){
        this.type[i]='blue';
    }else {
        this.type[i]='orange';
    }
};
// fruitObj.prototype.update=function () {
//
//     for(var i=0;i<this.num;i++){
//         if(this.alive[i]) num++;
//     }
// };
fruitObj.prototype.dead=function (i) {
    this.alive[i]=false;
};
function fruitMonitor() {
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]) num++;
    }
    if(num<15){
        sendFruit();
        return;
    }
}
function sendFruit() {
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}