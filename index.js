var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


// Add support for nicknames.
// Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
// Add “{user} is typing” functionality.
// Show who’s online.
// Add private messaging.

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

  // Broadcast a message to connected users when someone connects or disconnects.
  socket.emit('connected', {username: 'Mason'});

  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });


});



http.listen(3000, function() {
  console.log('Listening on *:3k');
});
