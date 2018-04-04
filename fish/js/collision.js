/**
 * Created by anthony on 2018/4/3.
 */
//  判断大鱼与果实的距离
function momFruitcollision() {
    if(!data.gameOver&&data.start){

        for(var i=0;i<fruit.num;i++){
            if(fruit.alive[i]){
                var l= calLength2(fruit.x[i],fruit.y[i],mum.x,mum.y);
                if(l<900){
                    fruit.dead(i);
                    data.fruitNum ++;
                    mum.mumBodyCount++;
                    if(mum.mumBodyCount>7){
                        mum.mumBodyCount=7;
                    }
                    if(fruit.type[i]=='blue'){
                        data._double=2;
                    }
                    wave.born(fruit.x[i],fruit.y[i],'mum');
                }
            }
        }
    }

}
function momBadycollision() {
    if(!data.gameOver &&mum.mumBodyCount !=0 &&data.start){
        var l=calLength2(mum.x,mum.y,child.x,child.y);
        if(l<900){
            child.babyBodyCount=0;
            // data.reset();
            mum.mumBodyCount=0;
            data.addScore();
            wave.born(child.x,child.y,'child');
            console.log('mom');
        }
    }
}