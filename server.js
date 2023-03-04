const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use(express.static('build'));

io.on('connection', socket => {
  console.log('A user has connected');

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});