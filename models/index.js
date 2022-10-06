var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root:12345678@localhost:3306/task_list');
var lodash = require('lodash');
var db = {};

fs.readdirSync(__dirname).filter(function(file) {
  return (file !== 'index.js');
}).forEach(function(file, key) {
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach(function(model) {
  if (!db[model].hasOwnProperty('associate')) {
    return;
  }
  return db[model].associate(db);
});

module.exports = lodash.extend({ Sequelize: Sequelize, sequelize: sequelize }, db);