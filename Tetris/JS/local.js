let Local = function () {
//     游戏对象

    let game;
    // 时间间隔
    const INTERVAL = 200;
    //定时器
    let timer = null;
    //  时间计数器
    let timeCount = 0;
    //  时间
    let time = 0;
    //  绑定键盘事件
    let bindKeyEvent = () => {
        //  将我这边进行的操作发送给对方，让对方的“对面的界面”页面出现一样的操作页面
        document.onkeydown = (e) => {
            if (e.keyCode === 37) {  // left
                game.left();
                socket.emit('left');
            } else if (e.keyCode === 38) {  // 旋转
                game.rotate();
                socket.emit('rotate');
            } else if (e.keyCode === 39) {  // right
                game.right();
                socket.emit('right');
            } else if (e.keyCode === 40) {  // down
                game.down();
                socket.emit('down');
            } else if (e.keyCode === 32) {  //空格键
                game.fall();
                socket.emit('fall');
            }
        }
    };
    // 移动
    let move = () => {
        timeFunc();
        // game.down();
        if (!game.down()) {
            game.fixed();
            socket.emit('fixed');
            let line = game.checkClear();
            if (line) {
                game.addScore(line);
                socket.emit('line', line);
                if (line > 1) {
                    let bottomLine = generateBottomLine(line);
                    //  当一次性消除超过一行，则给对方增加一行干扰行
                    socket.emit('bottomLines', bottomLine)
                }
            }
            //  游戏结束为true，否则为false
            let gameOver = game.checkGameOver();
            if (gameOver) {  //  若本人输了
                //  自己窗口的显示
                let local_score=document.querySelector('#local-score').innerHTML;
                let remote_score=document.querySelector('#remote-score').innerHTML;
                document.querySelector('#waiting').innerHTML = `
                <p>很遗憾，你输了~</p>
                <p>您的得分为 ${local_score} 分</p>
                <p>对方的得分为 ${remote_score} 分</p>`;
                // document.querySelector('#waiting').innerHTML = '';
                document.querySelector('#waiting').style.display="block";
                //  自己界面  对方窗口显示
                // document.querySelector('#remote-gameOver').innerHTML = '对方战胜了你。';
                //  发送我输了的消息
                socket.emit('lose');
                stop()
            } else {
                let type = generateType();
                let dire = generateDire();
                game.performNext(type, dire);
                socket.emit('next', {type, dire});
            }
        } else {
            socket.emit('down');
        }

    };
    // 随机生成干扰行函数
    let generateBottomLine = (lineNum) => {
        let lines = [];
        for (let i = 0; i < lineNum; i++) {
            let line = [];
            for (let j = 0; j < 10; j++) {
                line.push(Math.floor(Math.random() * 2));
            }
            lines.push(line);
        }
        return lines;
    };
    //  计时函数
    let timeFunc = () => {
        timeCount += 1;
        if (timeCount == 5) {
            timeCount = 0;
            time += 1;
            game.setTime(time);
            socket.emit('time', time);
        }
    };
    //  随机生成一个方块矩阵
    let generateType = () => {
        return Math.floor(Math.random() * 7);
    };
    //  随机生成一个方向
    let generateDire = () => {
        return Math.floor(Math.random() * 4);
    };
    //  开始
    let start = () => {
        let doms = {
            gameDiv: document.querySelector('#local-game'),
            nextDiv: document.querySelector('#local-next'),
            timeDiv: document.querySelector('#local-time'),
            scoreDiv: document.querySelector('#local-score'),
            resultDiv: document.querySelector('#local-gameOver')
        };
        game = new Game();
        let type = generateType();
        let dire = generateDire();
        game.init(doms, type, dire);
        socket.emit('init', {type, dire});
        bindKeyEvent();
        let type2 = generateType();
        let dire2 = generateDire();
        game.performNext(type2, dire2);
        socket.emit('next', {type: type2, dire: dire2});
        timer = setInterval(move, INTERVAL);
    };
//    结束
    let stop = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };
    // 对方进入页面，开始游戏，我这边监听
    socket.on('start', () => {
        document.querySelector('#waiting').innerHTML = '';
        document.querySelector('#waiting').style.display="none";
        start();
    });
     // 对方输了
    socket.on('lose', () => {
        // // game.gameOver(true);
        // document.querySelector('#local-gameOver').innerHTML = '恭喜你，你赢了';
        // //  对方窗口显示
        // document.querySelector('#remote-gameOver').innerHTML = '你战胜了对方。';
        stop();
    });

    //  对方离开，掉线
    socket.on('leave', () => {
        document.querySelector('#local-gameOver').innerHTML = '对方掉线~';
        document.querySelector('#remote-gameOver').innerHTML = ' ';
        document.querySelector('#waiting').style.display="none";
        stop();
    });
    //   对方给你增加干扰行
    socket.on('bottomLines', (data)=> {
        game.addLine(data);
        socket.emit('addLine', data);
    });
};
