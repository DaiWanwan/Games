let socket = io('ws://localhost:3000');
let local = new Local(socket);
let remote = new Remote(socket);

socket.on('waiting', function (str) {
    document.querySelector('#waiting').innerHTML = str;
});
