/**
 * Created by anthony on 2018/5/24.
 */
let Remote = function () {
    //  游戏对象
    let game;
    //     绑定按钮事件
    let bindEvents = function () {
        document.querySelector('#down').onclick = function () {
            game.down();
        };
        document.querySelector('#left').onclick = function () {
            game.left();
        };
        document.querySelector('#right').onclick = function () {
            game.right();
        };
        document.querySelector('#fall').onclick = function () {
            game.fall();
        };
        document.querySelector('#rotate').onclick = function () {
            game.rotate();
        };
        document.querySelector('#fixed').onclick = function () {
            game.fixed();
        };
        document.querySelector('#performNext').onclick = function () {
            game.performNext(2, 2);
        };
        document.querySelector('#checkClear').onclick = function () {
            game.checkClear();
        };
        document.querySelector('#checkGameOver').onclick = function () {
            game.checkGameOver();
        };
        document.querySelector('#setTime').onclick = function () {
            game.setTime(20);
        };
        document.querySelector('#addScore').onclick = function () {
            game.addScore(3);
        };
        document.querySelector('#gameOver').onclick = function () {
            game.gameOver(true);
        };
        document.querySelector('#addLine').onclick = function () {
            game.addLine([[0, 1, 0, 1, 0, 1, 0, 1, 0, 1]]);
        };
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


//    导出api
    this.start = start;
    this.bindEvents = bindEvents;
};