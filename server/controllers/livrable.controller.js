let Entity = require('../models/sequelize/livrable');


module.exports = {
  insert,
  update,
  destroy,
  get,
  list
};

async function insert(entity) {
  return await Entity.create(entity);
}

async function update(entity) {
  return await Entity.update(entity, {where: {id: entity.id}});
}

async function destroy(id) {
  return await Entity.destroy({where: {id: id}});
}

async function get(id) {
  return await Entity.findOne({where: {id: id}});
}

async function list() {
  return await Entity.findAll();
}
