var express = require('express');
var router = express.Router();
var db = require('./../models');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/auth', function(req, res) {
  res.render('login');
});

router.post('/auth', function(req, res) {
  db.Users.findOne({ where: { username: req.body.username, password: req.body.password } })
    .then(function(result) {
      if (!result) {
        return res.redirect('/users/auth');
      }
      return res.redirect('/tasks');
    })
    .catch(function(err) { console.log(err) });
});

module.exports = router;
