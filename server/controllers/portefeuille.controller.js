let Entity = require('../models/sequelize/portefeuille');
const Statut = require('../models/sequelize/statut');


module.exports = {
  insert,
  update,
  destroy,
  get,
  list,
  count
};

async function insert(entity) {
  return await Entity.create(entity);
}

async function update(entity, id) {
  return await Entity.update(entity, {where: {id: id}});
}

async function destroy(id) {
  return await Entity.destroy({where: {id: id}});
}

async function get(id) {
  return await Entity.findOne({where: {id: id}});
}

async function list(limit, page) {
  return await Entity.findAll({include: Statut, limit: Number(limit), offset: Number(page) * Number(limit)});
}

async function count() {
  return await Entity.count();
}
