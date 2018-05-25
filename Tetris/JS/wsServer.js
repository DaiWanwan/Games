let app = require('http').createServer();
let io = require('socket.io')(app);

const PORT = 3000;
//  客户端计数
let clientCount = 0;
//  用来存储客户端socket
let socketMap = {};

app.listen(PORT);
let bindLister = (socket, event) => {
    socket.on(event, (data) => {
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit(event, data);
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit(event, data);
            }
        }
    });
};
io.on('connection', (socket) => {
    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;
    //  如果单个人需要等待下一人进来进行配对

    if (clientCount % 2 == 1) {
        socket.emit('waiting', 'waiting for another person.')
    } else {
        if (socketMap[clientCount - 1]) {
            socket.emit('start');
            socketMap[clientCount - 1].emit('start');
        } else {
            socket.emit('leave');
        }
    }
    bindLister(socket, 'init');
    bindLister(socket, 'left');
    bindLister(socket, 'next');
    bindLister(socket, 'rotate');
    bindLister(socket, 'right');
    bindLister(socket, 'down');
    bindLister(socket, 'fall');
    bindLister(socket, 'fixed');
    bindLister(socket, 'line');
    bindLister(socket, 'time');
    bindLister(socket, 'lose');
    bindLister(socket, 'bottomLines');
    bindLister(socket, 'addLine');
    socket.on('disconnect', () => {
        if (socket.clientNum % 2 == 0) {
            if (socketMap[socket.clientNum - 1]) {
                socketMap[socket.clientNum - 1].emit('leave');
            }
        } else {
            if (socketMap[socket.clientNum + 1]) {
                socketMap[socket.clientNum + 1].emit('leave');
            }
        }
        delete (socketMap[socket.clientNum]);
    });
});
console.log(`webSocket listening on port ${PORT}`);