const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const avatarAPI = 'https://api.adorable.io/avatars/';

const app = express();

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


const temporaryDB = {
  names: [],
};


const server = app.listen(4000, function() {
  console.log('listen port 4000');
});

app.post('/register', function(req, res) {
  const name = req.body ? req.body.name : null;
  if (!name) {
    res.status(422).send({ error: 'validation error' });
  }
  
  if (temporaryDB.names.findIndex(nameData => nameData.name === name) === -1) {
    const avatar = `${avatarAPI}${parseInt(Math.random() * 10000)}`;
    res.send({ name, avatar });
    temporaryDB.names.push({ name, avatar })
  } else {
    res.status(409).send({ error: 'user already registred' });
  }
});

app.post('/signin', function(req, res) {
  const name = req.body ? req.body.name : null;
  if (!name) {
    res.status(422).send({ error: 'validation error' });
  }

  const indexName = temporaryDB.names.findIndex(nameData => nameData.name === name);

  if (indexName !== -1) {
    const dataName = temporaryDB.names[indexName];
    res.send(dataName);
  } else {
    res.status(409).send({ error: 'Can\'t find the userName' });
  }
});

const io = socket(server);

io.on('connection', function(socket) {
  // if (io.sockets.connected) {
  //   io.sockets.connected;
  //   console.log(io.sockets.connected)
  // }
  socket.on('chat', function(data) {
    console.log('chat', data);
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
