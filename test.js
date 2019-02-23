// Tests
let expect = require('chai').expect,
        io = require('socket.io-client'),
 socketURL = 'http://0.0.0.0:3000';

let chatUser1 = {name: 'Tom'},
    chatUser2 = {name: 'Dick'},
    chatUser3 = {name: 'Harry'};

let options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Chat Server', function() {
  it('Should broadcast new user to everyone', function(done) {
    // connect the first client
    let client1 = io.connect(socketURL, options);

    client1.on('connect', function(data) {
      client1.emit('adduser', chatUser1);
    });

    // connect the second client
    let client2 = io.connect(socketURL, options);

    client2.on('connect', function(data) {
      client2.emit('adduser', chatUser2);
    });

    client2.on('adduser', function(usersName) {
      usersName.should.equal('');
    });

    let numbers = 0;
    client1.on('adduser', function(usersName) {
      number+=1;

      if(numbers === 2) {
        usersName.should.equal(chatuser2.name + ' has joined');
      }

      client1.disconnect();
      done();
    });

  });
});
