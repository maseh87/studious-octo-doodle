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

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket) {

  // when the username is input
  socket.on('username', function(data) {
    // this is going to cause a problem
    _.merge(userObj, data);

    // userObj.userName = data.userName;

    // push the next user into the users storage
    // userObj.usersOnline.push(data.userName);


    // send it back to the frontend
    socket.emit('username', userObj);
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

  // Error handling
  socket.on('error', function(err) {
    console.log('recieved error from user: ', socket.id);
    console.log(err);
  });
});

http.listen(3000, function() {
  console.log('Listening on *:3k');
});
