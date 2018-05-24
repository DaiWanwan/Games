let Local = function () {
//     游戏对象
    let game;
    // 时间间隔
    const INTERVAL = 200;
    //定时器
    let timer = null;
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
        game.down();
        game.fixed();
    };
    //  开始
    let start = function () {
        let doms = {
            gameDiv: document.querySelector('#game'),
            nextDiv: document.querySelector('#next')
        };
        game = new Game();
        game.init(doms);
        bindKeyEvent();
        timer = setInterval(move, INTERVAL);
    };
//     导出api
    this.start = start;
};
