const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('build'));
app.use('socket.io', express.static('node_modules/socket.io'));

var players = {}

io.on('connection', (socket) => {
  
  var parts = socket.request.headers.referer.split('/');
  var room = parts[parts.length - 1];

  if(!players[room]) players[room] = {};

  var assignedPlayers = Object.keys(players[room]).map(key => players[room][key]);

  if (assignedPlayers.indexOf('a') === -1) players[room][socket.id] = 'a';
  else if (assignedPlayers.indexOf('b') === -1) players[room][socket.id] = 'b';
  else players[room][socket.id] = 'c'; // spectator

  socket.join(room);

  socket.emit('join', players[room][socket.id]);

  socket.on('turn', (data) => {
    socket.broadcast.emit('turn', data)
  });

  socket.on('pending games', (data) => {
    // get rooms with only one player
    var rooms = Object.keys(players).filter(room => {
      if (room.length && Object.keys(players[room]).length === 1) return room;
    })
    socket.emit('pending games', rooms)
  })

  socket.on('disconnect', () => {
    // remove users from room or delete room if empty
    if (!Object.keys(players[room]).length) delete players[room];
    else delete players[room][socket.id];
  })

})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
})

const PORT = 3000;

http.listen(PORT, () => {
  console.log('Connect Four running on port:', PORT);
})
