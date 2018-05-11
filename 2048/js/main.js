var board = new Array();
var score = 0;
$(document).ready(function () {
    newGame();
});
function newGame() {
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
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    updateBoardView();
}

function updateBoardView() {

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
}

function generateOneNumber() {
    if (nospace(board)) {
        return false;
    }
    //  随机一个位置
    var randx = randomPos(4);
    var randy = randomPos(4);
    while (true) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = randomPos(4);
        randy = randomPos(4);
    }
    //随机一个数字
    var randNumber = Math.random() < 0.3 ? 2 : 4;
    //显示
    board[randx][randy] = randNumber;
    showNumberAnimation(randx, randy, randNumber);
    return true
}


