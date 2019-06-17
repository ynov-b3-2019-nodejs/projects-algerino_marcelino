const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');
const Role = require('./roles');

const User = sequelize.define('User', {
  "email": Sequelize.STRING,
  "fullname": Sequelize.STRING,
  "hashedPassword": Sequelize.STRING,
}, {
  // options
});

Role.belongsToMany(User, {
  through: 'users_roles',
  foreignKey: 'roleId'
});

User.belongsToMany(Role, {
  through: 'users_roles',
  foreignKey: 'userId'
});

module.exports = User;
