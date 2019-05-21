const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const User = sequelize.define('User', {
  "email": Sequelize.STRING,
  "fullname": Sequelize.STRING,
  "hashedPassword": Sequelize.STRING,
}, {
  // options
});

module.exports = User;
