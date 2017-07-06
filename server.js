var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var server = app.listen(port);

app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log(socket.id);
    socket.on('move', moveMsg);
    socket.on('mouse', mouseMsg);
    
    
    function mouseMsg(data) {
        socket.broadcast.emit('mouse',data);
    }
    
    function moveMsg(data) {
        socket.broadcast.emit('move',data);
    }
}