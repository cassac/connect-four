const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('build'));
app.use('socket.io', express.static('node_modules/socket.io'));

var players = {}

const getRoomsWithOnePlayer = () => {
  return Object.keys(players).filter(room => {
    if (room.length && Object.keys(players[room]).length === 1) {
      return room;
    }
  })
}

const cleanUpRooms = (socket, room) => {
  // remove users from room or delete room if empty
  if (!Object.keys(players[room]).length) delete players[room];
  else delete players[room][socket.id];
}

io.on('connection', (socket) => {
  
  var parts = socket.request.headers.referer.split('/');
  var room = parts[parts.length - 1];

  if (!players[room]) players[room] = {};

  var assignedPlayers = Object.keys(players[room]).map(key => players[room][key]);

  if (assignedPlayers.indexOf('red') === -1) players[room][socket.id] = 'red';
  else if (assignedPlayers.indexOf('blue') === -1) players[room][socket.id] = 'blue';
  else players[room][socket.id] = 'spectator';

  socket.join(room);

  socket.emit('join', players[room][socket.id]);

  socket.on('create game', () => {
    socket.broadcast.emit('pending games', getRoomsWithOnePlayer())
  })

  socket.on('turn', (data) => {
    socket.broadcast.emit('turn', data)
  });

  socket.on('leave game', () => {
    cleanUpRooms(socket, room);
    socket.broadcast.emit('pending games', getRoomsWithOnePlayer())
  })

  socket.on('pending games', (data) => {
    socket.emit('pending games', getRoomsWithOnePlayer())
  })

  socket.on('disconnect', () => {
    cleanUpRooms(socket, room);
  })

})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
})

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log('Connect Four running on port:', PORT);
})
