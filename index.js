var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var _ = require('lodash');

// Show who’s online.
// Add support for nicknames.
// Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// Add private messaging.

let userObj = {
  userName: 'guest',
  messages: '',
  usersOnline: []
};

let rooms = ['room1', 'room2', 'room3'];

const members = new Map()
let chatHistory = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

  // when a new user logs into a chatroom
  socket.on('adduser', function(username) {
    // store userName in the socket
    socket.username = username;

    // store the room name in the socket
    socket.room = 'room1';

    // add user to list of current users
    userObj.username = username;

    // send the user to room 1
    socket.join('room1');

    // let the client know you have connected
    socket.emit('updatechat', 'SERVER', 'you have connected to room1');

    // let room 1 know a new user has connected
    socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');

    socket.emit('updaterooms', rooms, 'room1');
  });

  // when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updatechat', socket.username, data);
	});

  // Switching rooms
	socket.on('switchRoom', function(newroom){
    // leave the current room
		socket.leave(socket.room);
    // join the new room
		socket.join(newroom);
    // let the server know to update the chats
		socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
		socket.emit('updaterooms', rooms, newroom);
	});


	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global userObj list
		delete userObj[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', userObj);
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		socket.leave(socket.room);
	});
});

// Error handling
http.listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on *:3k');
});
