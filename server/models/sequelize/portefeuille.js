const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Portefeuille = sequelize.define('Portefeuille', {
  "nom": Sequelize.STRING,
}, {

});

module.exports = Portefeuille;
