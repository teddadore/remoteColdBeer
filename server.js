
require('dotenv').config();
// baseUrl = process.env.HOSTNAME + ':'+ process.env.PORT;
// console.log(baseUrl);
var express = require('express');



var app = express();
app.locals.baseUrl = process.env.HOSTNAME + ':'+ process.env.PORT;
console.log(app.locals);

var server = app.listen(process.env.PORT || 3000, function(){
	console.log("THIS IS MY CALLBACK");
});
// var server = app.listen(process.env.PORT);
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

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

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




