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
  console.log('Socket connect');
  socket.on('chat', function(data) {
    console.log(data);
    io.sockets.emit('chat', data);
  })
});
