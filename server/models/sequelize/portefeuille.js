const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Portefeuille = sequelize.define('Portefeuille', {
  "archived": Sequelize.BOOLEAN,
  "nom": Sequelize.STRING,
}, {

});

module.exports = Portefeuille;
