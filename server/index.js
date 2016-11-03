const express = require('express')

const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('build'));
app.use('socket.io', express.static('node_modules/socket.io'));

io.on('connection', (socket) => {

  // eventually `gameroom` will be dynamic room names
  socket.join('gameroom');
  const numberOfPlayers = socket.adapter.rooms['gameroom'].length;

  socket.emit('join', numberOfPlayers);

  socket.on('turn', (data) => {
    socket.broadcast.emit('turn', data)
  });

})

const PORT = 3000;

http.listen(PORT, () => {
  console.log('Connect Four running on port:', PORT);
})
