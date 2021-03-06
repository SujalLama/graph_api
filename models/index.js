'use strict';
require('dotenv').config({path: '../.env'});
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// const sequelize = new Sequelize(
//   process.env.DATABASE, 
//   process.env.USERNAME, 
//   "sanjal12345!", {
//   host: process.env.LOCALHOST,
//   dialect: 'postgres'
// });

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

const db = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Book: require('./book')(sequelize, Sequelize.DataTypes),
  Author: require('./author')(sequelize, Sequelize.DataTypes),
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
