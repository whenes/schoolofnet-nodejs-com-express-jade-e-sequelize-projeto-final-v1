var express = require('express');
var db = require('./../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.Tasks.findAll().then(function(result) {
    return res.render('tasks', { tasks: result });
  }).catch(function(err) { console.log(err) });
});

router.get('/:id', function(req, res) {
  db.Tasks.findByPk(req.params.id).then(function(result) {
    res.render('task', { task: result });
  }).catch(function(err) { console.log(err) });
});

router.get('/create', function(req, res) {
  res.render('new_task');
});

router.post('/create', function(req, res) {
  if (!req.body.name || !req.body.name.length) {
    return res.redirect('/tasks/create');
  }
  db.Tasks.create(req.body).then(function(result) {
    return res.redirect('/tasks');
  }).catch(function(err) { console.log(err) });
});

router.delete('/:id', function(req, res) {
  db.Tasks.destroy({ where: { id: req.params.id } }).then(function(result) {
    res.redirect('/tasks');
  }).catch(function(err) { console.log(err) });
});

router.put('/edit/:id', function(req, res) {
  db.Tasks.update(req.body, { where: { id: req.params.id }}).then(function(result) {
    return res.redirect('/tasks');
  }).catch(function(err) { console.log(err) });
});

router.get('/edit/:id', function(req, res) {
  db.Tasks.findByPk(req.params.id).then(function(result) {
    res.render('edit_task', { task: result });
  }).catch(function(err) { console.log(err) });
});

module.exports = router;