let   Entity       = require('../models/sequelize/projet');
const Portefeuille = require('../models/sequelize/portefeuille');
const Statut       = require('../models/sequelize/statut');
const Livrable     = require('../models/sequelize/livrable');


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

async function update(entity) {
  return await Entity.update(entity, { where: { id: entity.id } });
}

async function destroy(id) {
  return await Entity.destroy({ where: { id: id } });
}

async function get(id) {
  return await Entity.findOne({ where: { id: id }, include: [Portefeuille, Statut, Livrable] });
}

async function list(id, page, limit) {
  return await Entity.findAll({
    where  : { portefeuilleId: id },
    include: [Portefeuille, Statut],
    limit  : Number(limit),
    offset : Number(page) * Number(limit)
  });
}

async function count() {
  return await Entity.count();
}
