const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Projet = sequelize.define('Projet', {
  "nom": Sequelize.STRING,
}, {
  // options
});

module.exports = Projet;
