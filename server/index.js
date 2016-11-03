const express = require('express')
const socket = require('socket.io');
const path = require('path');

const app = express();

app.use(express.static('build'));

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Connect Four running on port:', PORT);
})
