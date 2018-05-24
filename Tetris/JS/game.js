let Game = function () {
    // dom元素
    let gameDiv;
    let nextDiv;
//     游戏矩阵
    let gameData = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    //  当前方块
    let cur;
    //  下一个方块
    let next;
    //  divs
    let nextDivs = [];
    let gameDivs = [];
//    初始化div
    let initDiv = function (container, data, divs) {
        for (let i = 0; i < data.length; i++) {
            let Div = [];
            for (let j = 0; j < data[0].length; j++) {
                let newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = `${i * 20}px`;
                newNode.style.left = `${j * 20}px`;
                container.appendChild(newNode);
                Div.push(newNode);
            }
            divs.push(Div);
        }
    };
//    刷新div
    let refreshDiv = function (data, divs) {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[0].length; j++) {
                if (data[i][j] === 0) {
                    divs[i][j].className = 'none';
                } else if (data[i][j] === 1) {
                    divs[i][j].className = 'done';
                } else if (data[i][j] === 2) {
                    divs[i][j].className = 'current';
                }
            }
        }
    };
//    检测点是否合法
    let check = function (pos, x, y) {
        if ((pos.x + x < 0) || (pos.x + x >= gameData.length) || (pos.y + y < 0) || (pos.y + y >= gameData[0].length) || (gameData[pos.x + x][pos.y + y] === 1)) {
            return false;
        } else {
            return true;
        }
    };
//    检测数据是否合法
    let isValid = function (pos, data) {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (data[i][j] !== 0) {
                    if (!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
//    清除数据
    let clearData = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = 0;
                }
            }
        }
    };
//     设置数据
    let setData = function () {
        for (let i = 0; i < cur.data.length; i++) {
            for (let j = 0; j < cur.data[0].length; j++) {
                if (check(cur.origin, i, j)) {
                    gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
                }
            }
        }
    };
    //    下移
    let down = function () {
        if (cur.canDown(isValid)) {
            clearData();
            cur._down();
            setData();
            refreshDiv(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    };
    //    左移
    let left = function () {
        if (cur.canLeft(isValid)) {
            clearData();
            cur._left();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
    //    右移
    let right = function () {
        if (cur.canRight(isValid)) {
            clearData();
            cur._right();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
//    旋转
    let rotate = function () {
        if (cur.canRotate(isValid)) {
            clearData();
            cur._rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };
//    初始化
    let init = function (doms) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        cur = SquareFactory.prototype.make(2, 2);
        next = SquareFactory.prototype.make(3, 3);
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        setData();
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    };


//     导出api
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.rotate = rotate;
    this.fall = function () {
        while (down());
    }

};