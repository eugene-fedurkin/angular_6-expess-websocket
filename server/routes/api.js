const express = require ('express');
const router = express.Router();
const avatarAPI = 'https://api.adorable.io/avatars/';
const SignUp = require('../models/sign-up');

router.post('/register', function(req, res) {
  const name = req.body ? req.body.name : null;
  const avatar = req.body ? req.body.avatar : null;
  
  if (!name) {
    res.status(422).send({ error: 'validation error' });
  }
  SignUp.find({ name }).exec(function(err, user) {
    if (err) throw err;

    if (user && user.length) {
      res.status(409).send({ error: 'user already registred' });
    } else {
      const avatar = `${avatarAPI}${parseInt(Math.random() * 10000)}`;
      SignUp.create({ ...req.body, avatar })
        .then(saved => res.send(saved));
    }
  });
});

router.post('/signin', function(req, res) {
  const name = req.body ? req.body.name : null;
  if (!name) {
    res.status(422).send({ error: 'validation error' });
  }

  SignUp.find({ name }).exec(function(err, user) {
    if (err) throw err;
    console.log(user);
    if (user && user.length) {
      res.send({
        name: user[0].name,
        avatar: user[0].avatar,
      });
    } else {
      res.status(409).send({ error: 'Can\'t find the userName' });
    }
  });
});

module.exports = router;
