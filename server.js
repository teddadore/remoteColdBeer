
var express = require('express');

var app = express();
var server = app.listen(3000);
// var path = require('path');
app.use(express.static('public'));

app.get('/leftside', function(req, res) {
	res.sendFile(__dirname + '/public/leftside.html');
});

app.get('/rightside', function(req, res){
	res.sendFile(__dirname + '/public/rightside.html');
});


console.log('My socket server is running, dude');

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('New connection, bro: ' + socket.id);
	// console.log(socket);

	socket.on('rightPlayer', rightMsg);
	socket.on('leftPlayer', leftMsg);

	function rightMsg(data) {
		socket.broadcast.emit('rightPlayer', data);
		console.log(data);
	}

	function leftMsg(data) {
		socket.broadcast.emit('leftPlayer', data);
		console.log(data);
	}


}




