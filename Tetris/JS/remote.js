/**
 * Created by anthony on 2018/5/24.
 */
let Remote = function () {
    //  游戏对象
    let game;
    //     绑定按钮事件
    let bindEvents = function () {
        socket.on('init', function (data) {
            start(data.type, data.dire);
        });
        socket.on('next', function (data) {
            game.performNext(data.type, data.dire);
        });
        socket.on('rotate', function (data) {
            game.rotate();
        });
        socket.on('left', function (data) {
            game.left();
        });
        socket.on('right', function (data) {
            game.right();
        });
        socket.on('down', function (data) {
            game.down();
        });
        socket.on('fall', function (data) {
            game.fall();
        });
        socket.on('fixed', function (data) {
            game.fixed();
        });
        socket.on('line', function (data) {
            game.checkClear();
            game.addScore(data)
        });
        socket.on('time', function (data) {
            game.setTime(data);
        });
        socket.on('time', function (data) {
            game.gameOver(false);
        });
        socket.on('addLine', function (data) {
            game.addLine(false);
        });

    };
    //  开始游戏
    let start = function (type, dire) {
        let doms = {
            gameDiv: document.querySelector('#remote-game'),
            nextDiv: document.querySelector('#remote-next'),
            timeDiv: document.querySelector('#remote-time'),
            scoreDiv: document.querySelector('#remote-score'),
            resultDiv: document.querySelector('#remote-gameOver')
        };
        game = new Game();
        game.init(doms, type, dire);
    };
    bindEvents();

};