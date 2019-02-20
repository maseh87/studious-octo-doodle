var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Add support for nicknames.
// Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// Add “{user} is typing” functionality.
// Show who’s online.
// Add private messaging.
let userObj = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  // Broadcast a message to connected users when someone connects or disconnects.
  socket.emit('connected', userObj);


  socket.on('username', function(data) {
    console.log('got username from frontend: ', data)
    userObj.userName = data.userName;
    socket.emit('username', userObj);
  });

  socket.on('chat message', function(msgObj) {
    console.log(msgObj);
    io.emit('chat message', msgObj);
  });


});



http.listen(3000, function() {
  console.log('Listening on *:3k');
});
