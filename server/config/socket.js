const server = require('http').createServer();
const io = require('socket.io')(server, {origins: '*:*'});
const config = require('./config');

io.set('origins', '*:*');
io.origins('*:*');
io.on('connection', function (socket) {
  console.log('UserConnected');

  socket.on('error', function(err) {
    console.error(err)
  });

  socket.on('connect_error', function (err) {
    console.error('connect error', err);
  });

  socket.on('calendar-update', function () {
    io.emit('calendar-changed', {for: 'everyone'});
  });
});

server.listen(config.socketPort, function () {
  console.log('listening on *:' + config.socketPort);
});

module.exports = {io, server};
