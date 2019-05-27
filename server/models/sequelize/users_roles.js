const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const UsersRoles = sequelize.define('users_roles', {
  "roleId": Sequelize.INTEGER,
  "userId": Sequelize.INTEGER,
}, {
  // options
});

module.exports = UsersRoles;
