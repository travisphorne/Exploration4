var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//on connection even
io.on('connection', function(socket){
	io.emit('chat message', '--a user joined the room--');
	console.log('a user connected');
	
	//on chat message event
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
		console.log('message: ' + msg);
	});
	
	//on disconnect event
	socket.on('disconnect', function(){
		io.emit('chat message', '--a user left the room--');
		console.log('user disconnected');
	});
	
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});