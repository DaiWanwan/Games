/**
 * Created by anthony on 2018/5/24.
 */
let Remote = function () {
    //  游戏对象
    let game;
    //     绑定按钮事件
    let bindEvents = () => {
        socket.on('init', (data) => {
            start(data.type, data.dire);
        });
        socket.on('next', (data) => {
            game.performNext(data.type, data.dire);
        });
        socket.on('rotate', () => {
            game.rotate();
        });
        socket.on('left', () => {
            game.left();
        });
        socket.on('right', () => {
            game.right();
        });
        socket.on('down', () => {
            game.down();
        });
        socket.on('fall', () => {
            game.fall();
        });
        socket.on('fixed', () => {
            game.fixed();
        });
        socket.on('line', (data) => {
            game.checkClear();
            game.addScore(data)
        });
        socket.on('time', (data) => {
            game.setTime(data);
        });
        socket.on('lose', (data) => {
            // game.gameOver(false);
            // 当对方输了，第二者窗口的显示
            let local_score=document.querySelector('#local-score').innerHTML;
            let remote_score=document.querySelector('#remote-score').innerHTML;
            document.querySelector('#waiting').innerHTML = `
                <p>恭喜你，你赢了~</p>
                <p>您的得分为 ${local_score} 分</p>
                <p>对方的得分为 ${remote_score} 分</p>`;
            // document.querySelector('#waiting').innerHTML =
            //     `
            //     <p>恭喜你，你赢了~</p>
            //     <p>你的得分是${data}</p>
            //         `;
            // document.querySelector('#waiting').innerHTML = '';
            document.querySelector('#waiting').style.display = "block";
            // document.querySelector('#local-gameOver').innerHTML = '恭喜你，你赢了~';
            //  自己界面 对方窗口显示
            // document.querySelector('#remote-gameOver').innerHTML = '你战胜了对方';

        });
        socket.on('addLine', () => {
            game.addLine(false);
        });

    };
    //  开始游戏
    let start = (type, dire) => {
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