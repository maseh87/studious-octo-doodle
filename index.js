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


function broadcastMessages(msg) {
  members.forEach(function(member) {
    // emit a message for each
  });
}

function addMessage(msg) {
  chatHistory = chatHistory.concat(msg);
}

function getChatHistory() {
  return chatHistory.slice();
}

function addUser(user) {
  members.set(user.id, user);
}

function removeUser(user) {
  members.delete(user.id);
}

function serialize() {
  return {
    name,
    numMembers: members.size
  }
}

////////// handler functions //////////
let joinHandler = function(chatroomName, cb) {

};

let getChatroomsHandler = function() {

};

let leaveHandler = function() {

};

let disconnectHandler = function() {

};

let getOnlineUsers = function() {

};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

  // when a new user logs into a chatroom
  socket.on('addUser', function(username) {
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

  // listen for chat messages
  socket.on('chat message', function(msgObj) {
    console.log(msgObj);
    io.emit('chat message', msgObj);
  });

  // socket.on('', function() {
  //
  // });

  // Add “{user} is typing” functionality.


  // Broadcast a message to connected users when someone connects or disconnects.
  socket.emit('connected', userObj);

  // user joins
  socket.on('join', joinHandler);

  // user leaves
  socket.on('leave', leaveHandler);

  // chatrooms
  socket.on('chatrooms', getChatroomsHandler);

  // get online users
  socket.on('onlineUsers', getOnlineUsers)

  // disconnection
  socket.on('disconnect', function() {
    console.log('User disconnected: ', socket.id);
    // disconnectHandler();
  });

  // Error handling
  socket.on('error', function(err) {
    console.log('recieved error from user: ', socket.id);
    console.log(err);
  });
});

http.listen(3000, function(err) {
  if (err) throw err
  console.log('Listening on *:3k');
});
