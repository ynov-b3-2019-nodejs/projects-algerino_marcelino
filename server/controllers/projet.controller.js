let Entity = require('../models/sequelize/projet');
const Portefeuille = require('../models/sequelize/portefeuille');
const Statut = require('../models/sequelize/statut');


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

async function update(id, entity) {
  return await Entity.update(entity, { where: { id: id }});
}

async function destroy(id) {
  return await Entity.destroy({where: {id: id}});
}

async function get(id) {
  return await Entity.findOne({ where: { id: id }, include: [Portefeuille, Statut]});
}

async function list(id) {
  return await Entity.findAll({ where: { portefeuilleId: id }, include: [Portefeuille, Statut]});
}
