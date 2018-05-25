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
    let bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if (e.keyCode === 37) {  // left
                game.left();
            } else if (e.keyCode === 38) {  // 旋转
                game.rotate();
            } else if (e.keyCode === 39) {  // right
                game.right();
            } else if (e.keyCode === 40) {  // down
                game.down();
            } else if (e.keyCode === 32) {  //空格键
                game.fall();
            }
        }
    };
    // 移动
    let move = function () {
        timeFunc()
        // game.down();
        if (!game.down()) {
            game.fixed();
            let line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            let gameOver = game.checkGameOver();
            if (gameOver) {
                game.gameOver(false);
                stop()
            } else {
                game.performNext(generateType(), generateDire());
            }
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
            if (time % 10 == 0) {
                game.addLine(generateBottomLine(1));
            }
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
        game.init(doms, generateType(), generateDire());
        bindKeyEvent();
        game.performNext(generateType(), generateDire());
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
//     导出api
    this.start = start;
};
