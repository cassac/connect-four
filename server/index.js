const express = require('express')

const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('build'));
app.use('socket.io', express.static('node_modules/socket.io'));

var players = {}

io.on('connection', (socket) => {

  var amount = Object.keys(players).length;

  if (!amount) players[socket.id] = 'a';
  else players[socket.id] = 'b';

  // eventually `gameroom` will be dynamic room names
  socket.join('gameroom');

  socket.emit('join', players[socket.id]);

  socket.on('turn', (data) => {
    socket.broadcast.emit('turn', data)
  });

  socket.on('disconnect', () => {
    delete players[socket.id]
  })

})

const PORT = 3000;

http.listen(PORT, () => {
  console.log('Connect Four running on port:', PORT);
})
