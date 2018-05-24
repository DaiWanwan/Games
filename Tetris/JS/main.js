let nextData = [
    [0, 0, 0, 0],
    [0, 2, 0, 0],
    [0, 2, 2, 0],
    [0, 2, 0, 0]
];
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
    [0, 0, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 1, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0]
];
let nextDivs = [];
let gameDivs = [];
let initGame = function () {
    for (let i = 0; i < gameData.length; i++) {
        let gameDiv = [];
        for (let j = 0; j < gameData[0].length; j++) {
            let newNode = document.createElement('div');
            newNode.className = 'none';
            newNode.style.top = `${i * 20}px`;
            newNode.style.left = `${j * 20}px`;
            document.querySelector('#game').appendChild(newNode);
            gameDiv.push(newNode);
        }
        gameDivs.push(gameDiv);
    }
};
let initNext = function () {
    for (let i = 0; i < nextData.length; i++) {
        let nextDiv = [];
        for (let j = 0; j < nextData[0].length; j++) {
            let newNode = document.createElement('div');
            newNode.className = 'none';
            newNode.style.top = `${i * 20}px`;
            newNode.style.left = `${j * 20}px`;
            document.querySelector('#next').appendChild(newNode);
            nextDiv.push(newNode);
        }
        nextDivs.push(nextDiv);
    }
};
let refreshGame = function () {
    for (let i = 0; i < gameData.length; i++) {
        for (let j = 0; j < gameData[0].length; j++) {
            if (gameData[i][j] === 0) {
                gameDivs[i][j].className = 'none';
            } else if (gameData[i][j] === 1) {
                gameDivs[i][j].className = 'done';
            } else if (gameData[i][j] === 2) {
                gameDivs[i][j].className = 'current';
            }
        }
    }
};
let refreshNext = function () {
    for (let i = 0; i < nextData.length; i++) {
        for (let j = 0; j < nextData[0].length; j++) {
            if (nextData[i][j] === 0) {
                nextDivs[i][j].className = 'none';
            } else if (nextData[i][j] === 1) {
                nextDivs[i][j].className = 'done';
            } else if (nextData[i][j] === 2) {
                nextDivs[i][j].className = 'current';
            }
        }
    }
};

initGame();
initNext();
refreshGame();
refreshNext();