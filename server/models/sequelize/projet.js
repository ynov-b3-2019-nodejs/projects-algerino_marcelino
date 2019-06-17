const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Projet = sequelize.define('Projet', {
  "archived": Sequelize.BOOLEAN,
  "nom": Sequelize.STRING,
}, {
  // options
});

module.exports = Projet;
