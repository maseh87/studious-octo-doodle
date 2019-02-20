// <script>
//   $(function () {
//     var socket = io();
//     $('form').submit(function(e){
//       e.preventDefault(); // prevents page reloading
//       socket.emit('chat message', $('#m').val());
//       $('#m').val('');
//       return false;
//     });
//
//     socket.on('chat message', function(msg){
//       $('#messages').append($('<li>').text(msg));
//     });
//     // Broadcast a message to connected users when someone connects or disconnects.
//     socket.on('connected', function(msg) {
//       console.log('message: ', msg);
//       $('#messages').append($('<li>').text(msg.username + ' has joined'));
//     });
//   });
// </script>
