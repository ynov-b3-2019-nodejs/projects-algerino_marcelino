const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Statut = sequelize.define('Statut', {
  "nom": Sequelize.STRING,
  "code": Sequelize.STRING,
}, {
  // options
});

module.exports = Statut;
