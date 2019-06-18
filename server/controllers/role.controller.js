let Entity = require('../models/sequelize/roles');


module.exports = {
  list
};

async function list() {
  return await Entity.findAll();
}
