const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Livrable = sequelize.define('Livrable', {
  "archived": Sequelize.BOOLEAN,
  "nom": Sequelize.STRING,
  "dateprevu": Sequelize.DATE,
  "datefin": Sequelize.DATE,
}, {
  // options
});

module.exports = Livrable;
