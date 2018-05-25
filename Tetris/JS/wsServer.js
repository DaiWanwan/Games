let app = require('http').createServer();
let io = require('socket.io')(app);

const PORT = 3000;
//  客户端计数
let clientCount = 0;
//  用来存储客户端socket
let socketMap = {};

app.listen(PORT);

io.on('connection', function (socket) {
    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;
    //  如果单个人需要等待下一人进来进行配对

    if (clientCount % 2 == 1) {
        socket.emit('waiting', 'waiting for another person.')
    } else {
        socket.emit('start');
        socketMap[clientCount - 1].emit('start');

    }
    socket.on('disconnect', function () {

    });
});
console.log(`webSocket listening on port ${PORT}`);