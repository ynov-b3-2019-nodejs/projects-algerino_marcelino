const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Role = sequelize.define('Roles', {
  "code": Sequelize.STRING,
  "name": Sequelize.STRING
}, {
  // options
});

module.exports = Role;
