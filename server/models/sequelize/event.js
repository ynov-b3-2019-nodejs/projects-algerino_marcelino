const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize');

const Event = sequelize.define('Event', {
  "titre": Sequelize.STRING,
  "datedebut": Sequelize.DATE,
  "datefin": Sequelize.DATE,
}, {
    // options
  });

module.exports = Event;
