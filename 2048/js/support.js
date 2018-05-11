var documentWidth = window.screen.availWidth;
var gridContainerWidth = 0.92 * documentWidth;
var cellSlideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;
function getPosTop(i, j) {
    return cellSpace + i * (cellSlideLength + cellSpace);
}
function getPosLeft(i, j) {
    return cellSpace + j * (cellSlideLength + cellSpace);
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#ff8561";
            break;
        case 64:
            return "#ff7736";
            break;
        case 128:
            return "#ff6421";
            break;
        case 256:
            return "#ff5417";
            break;
        case 512:
            return "#ff400e";
            break;
        case 1024:
            return "#cf4781";
            break;
        case 2048:
            return "#cf3e9a";
            break;
        case 4096:
            return "#cb3bcf";
            break;
        case 8192:
            return "#c81fcf";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                return false;
            }
        }
    }
    return true;
}

function randomPos(i) {
    var p = parseInt(Math.floor(Math.random() * i));
    return p;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                if (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {

    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--)
            if (board[i][j] !== 0)
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j])
                    return true;

    return false;
}

function canMoveUp(board) {

    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++)
            if (board[i][j] !== 0)
                if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j])
                    return true;

    return false;
}

function canMoveDown(board) {

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--)
            if (board[i][j] !== 0)
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j])
                    return true;

    return false;
}

function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] !== 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] !== 0)
            return false;
    return true;
}

function noMove(board) {
    if (canMoveLeft(board) || canMoveDown(board) || canMoveRight(board) || canMoveUp(board)) {
        return false;
    }
    return true;
}

function gameOver() {
    var gameover = $('.gameover');
    gameover.css('display', 'block');
    var _score = $('#finalscore');
    _score.text(score);
    document.removeEventListener('touchend', touchMove);
}