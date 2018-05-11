var board = new Array();
var score = 0;
var hasConflicted = new Array();
var times = 0;
$(document).ready(function () {
    prepareForMobile();
    newGame();
});
function prepareForMobile() {
    if (documentWidth > 500) {
        gridContainerWidth = 500;
        cellSlideLength = 100;
        cellSpace = 20;
    }
    var _gridContainer = $('#grid-container');
    var _gridCell = $('.grid-cell');
    _gridContainer.css({
        'width': gridContainerWidth - 2 * cellSpace,
        'height': gridContainerWidth - 2 * cellSpace,
        'padding': cellSpace,
        'border-radius': 0.02 * gridContainerWidth
    });
    _gridCell.css({
        'width': cellSlideLength,
        'height': cellSlideLength,
        'border-radius': 0.02 * cellSlideLength
    })
}
function newGame() {
    var gameover = $('.gameover');
    gameover.css('display', 'none');
    //  初始化
    init();
//    随机的两个格子里，生成数字
    generateOneNumber();
    generateOneNumber();
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $('#grid-cell-' + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }
    }
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();

    score = 0;
}

function updateBoardView() {

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css({
                    'width': '0px',
                    'height': '0px',
                    'top': (getPosTop(i, j) + cellSlideLength / 2) + 'px',
                    'left': (getPosLeft(i, j) + cellSlideLength / 2) + 'px'
                });
            }
            else {
                theNumberCell.css({
                    'width': cellSlideLength + 'px',
                    'height': cellSlideLength + 'px',
                    'top': getPosTop(i, j) + 'px',
                    'left': getPosLeft(i, j) + 'px',
                    'background-color': getNumberBackgroundColor(board[i][j]),
                    'color': getNumberColor(board[i][j])
                });
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }
    var _numcell = $('.number-cell');
    _numcell.css({
        'line-height': cellSlideLength + 'px',
        'font-size': 0.6 * cellSlideLength + 'px'
    })
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //  随机一个位置
    var randx = randomPos(4);
    var randy = randomPos(4);
    while (times < 50) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = randomPos(4);
        randy = randomPos(4);
        times++;
    }
    if (times === 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    //随机一个数字
    var randNumber = Math.random() < 0.3 ? 2 : 4;
    //显示
    board[randx][randy] = randNumber;
    showNumberAnimation(randx, randy, randNumber);
    return true
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:   //  left
            if (moveLeft()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }
            break;
        case 38:  // top
            if (moveUp()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }
            break;
        case 39:   // right
            if (moveRight()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }
            break;
        case 40:  //  down
            if (moveDown()) {
                setTimeout('generateOneNumber()', 210);
                setTimeout('isGameOver()', 300);
            }
            break;
        default:
            break;
    }
});
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        //    移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //  移动
                        showMoveAnimation(i, j, i, k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        //    叠加
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateBoardView()', 200);
    return true;
}
function moveRight() {
    if (!canMoveRight(board))
        return false;

    //moveRight
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board))
        return false;
    //moveUp
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < i; k++) {

                    if (board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board))
        return false;

    //moveDown
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {

                    if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()", 200);
    return true;
}

function isGameOver() {
    if (nospace(board) && noMove(board)) {
        gameOver();
    }
}

function updateScore() {
    var _score = $('#score');
    _score.text(score);
}