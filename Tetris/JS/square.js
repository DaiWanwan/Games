/**
 * Created by anthony on 2018/5/24.
 */
let Square = function () {
//    方块的数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
//     原点
    this.origin = {
        x: 0,
        y: 0
    };
//    旋转方向
    this.dire = 0;
};
//  旋转
Square.prototype.canRotate = function (isValid) {
    let d = (this.dire + 1) % 4;
    let test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[0].length; j++) {
            test[i][j] = this.rotates[d][i][j];
        }
    }
    return isValid(this.origin, test);
};
Square.prototype._rotate = function (num) {
    if (!num) num = 1;
    this.dire = (this.dire + num) % 4;
    for (let i = 0; i < this.data.length; i++) {
        for (let j = 0; j < this.data[0].length; j++) {
            this.data[i][j] = this.rotates[this.dire][i][j];
        }
    }

};
//  下移
Square.prototype.canDown = function (isValid) {
    let test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return isValid(test, this.data)
};
Square.prototype._down = function () {
    this.origin.x += 1;
};
// 左移
Square.prototype.canLeft = function (isValid) {
    let test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return isValid(test, this.data)
};
Square.prototype._left = function () {
    this.origin.y -= 1;
};
//  右移
Square.prototype.canRight = function (isValid) {
    let test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return isValid(test, this.data)
};
Square.prototype._right = function () {
    this.origin.y += 1;
};