const Sequelize = require('sequelize');
const config = require('./config');


// Option 1: Passing parameters separately
const sequelize = new Sequelize(
  config.sequelize.db, 
  config.sequelize.usr, 
  config.sequelize.pwd ? config.sequelize.pwd : '',
  {
    host: config.sequelize.url,
    dialect: 'mysql',
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
