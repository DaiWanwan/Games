/**
 * Created by anthony on 2018/4/4.
 */
var waveObj=function () {
    this.x=[];
    this.y=[];
    this.alive=[];
    this.r=[];
};
waveObj.prototype.num=10;
waveObj.prototype.init=function () {
    for(var i=0;i<this.num;i++){
        this.alive[i]='idle';
        this.r[i]=0;
    }
};
waveObj.prototype.draw=function () {
    ctx1.save();
    ctx1.lineWidth = 2;   //   线的宽度
    ctx1.shadowBlur=15;
    ctx1.shadowColor='white';
    for(var i=0;i<this.num;i++){
        if( this.alive[i]=='mum'){
            this.r[i] +=deltaTme*0.04;
            if(this.r[i]>50){
                this.alive[i]='idle';
                break;
            }
            var Alpha=1-this.r[i]/50;
            ctx1.beginPath();  // 开始路径
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
            ctx1.closePath();
            ctx1.strokeStyle = 'rgba(255,255,255,'+Alpha+')';  // 线颜色
            ctx1.stroke();
        }
        if( this.alive[i]=='child'){
            this.r[i] +=deltaTme*0.05;
            if(this.r[i]>80){
                this.alive[i]='idle';
                break;
            }
            var Alpha2=1-this.r[i]/80;
            ctx1.beginPath();  // 开始路径
            ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
            ctx1.closePath();
            ctx1.strokeStyle = 'rgba(255,165,0,'+Alpha2+')';  // 线颜色
            ctx1.stroke();
        }
    }
    ctx1.restore();
};
waveObj.prototype.born=function (x,y,obj) {
    if(obj=='mum'){
        for(var i=0;i<this.num;i++){
            if( this.alive[i] =='idle'){
                this.alive[i]='mum';
                this.r[i]=10;
                this.x[i]=x;
                this.y[i]=y;
                return;
            }
        }
    }
    if(obj=='child'){
        for(var i=0;i<this.num;i++){
            if( this.alive[i] =='idle'){
                this.alive[i]='child';
                this.r[i]=20;
                this.x[i]=x;
                this.y[i]=y;
                return;
            }
        }
    }
};