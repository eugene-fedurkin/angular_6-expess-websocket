const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/";
const app = express();
const Messages = require('./models/messages');
const Message = require('./models/message');

const api = require('./routes/api');

mongoose.connect(url);

app.use(bodyParser.json());
const originsWhitelist = [
  'http://localhost:4200'
];
const corsOptions = {
  origin: function(origin, callback) {
    const isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
    callback(null, isWhitelisted);
  },
  credentials:true
}
app.use(cors(corsOptions));
app.use('/', api);

const server = app.listen(4000, function() {
  console.log('listen port 4000');
});

const io = socket(server);

io.on('connection', function(socket) {
  socket.on('chat', function(data) {
    // console.log('chat', data);

    Messages.find({}).exec(function(err, messages) { // TOO: save message
      if (err) throw err;
      // const messageSchema = new Message(data);
      // messages.push(data);
      // Messages.save(() => console.log('saved'));
      // console.log(messages);
    });
    io.sockets.emit('chat', data);
  });

  socket.on('join', function(data) {
    console.log('join', data);
    io.sockets.emit('join', data);
  });

  socket.on('delete', function(data) {
    console.log('delete', data);
    io.sockets.emit('delete', data);
  });

  socket.on('edit', function(message, newMessage) {
    console.log('edit', message, newMessage);
    io.sockets.emit('edit', { message, newMessage });
  });

  socket.on('exitUser', function(userName) {
    console.log('exitUser', userName);
    io.sockets.emit('exitUser', userName);
  });
});
