let Local = function () {
//     游戏对象

    let game;
    // 时间间隔
    const INTERVAL = 300;
    //定时器
    let timer = null;
    //  时间计数器
    let timeCount = 0;
    //  时间
    let time = 0;
    //  绑定键盘事件
    let bindKeyEvent = function () {
        document.onkeydown = function (e) {
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
    let move = function () {
        timeFunc()
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
                    socket.emit('bottomLines',bottomLine)
                }
            }
            let gameOver = game.checkGameOver();
            if (gameOver) {
                game.gameOver(false);
                document.querySelector('#remote-gameOver').innerHTML = '你赢了！';
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
    let generateBottomLine = function (lineNum) {
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
    let timeFunc = function () {
        timeCount += 1;
        if (timeCount == 5) {
            timeCount = 0;
            time += 1;
            game.setTime(time);
            socket.emit('time', time);
        }
    };
    //  随机生成一个方块矩阵
    let generateType = function () {
        return Math.floor(Math.random() * 7);
    };
    //  随机生成一个方向
    let generateDire = function () {
        return Math.floor(Math.random() * 4);
    };
    //  开始
    let start = function () {
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
    let stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    };
    socket.on('start', function () {
        document.querySelector('#waiting').innerHTML = '';
        start();
    });
    socket.on('lose', function () {
        game.gameOver(true);
        stop();
    });
    socket.on('leave', function () {
        document.querySelector('#local-gameOver').innerHTML = '对方掉线~';
        document.querySelector('#remote-gameOver').innerHTML = '您已掉线~';
        stop();
    });
    socket.on('bottomLines', function (data) {
        game.addLine(data);
        socket.emit('addLine',data);
    });
};
