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
  return await Entity.update(entity, { where: { id: entity.id, archived: null} });
}

async function destroy(id) {
  return await Entity.update({archived: true}, { where: { id: id } });
}

async function get(id) {
  return await Entity.findOne({ where: { id: id, archived: null }, include: [Portefeuille, Statut, Livrable] });
}

async function list(id, page, limit) {
  return id == 'null'
    ? await Entity.findAll({
    where: {archived: null},
    include: [Portefeuille, Statut],
    limit  : Number(limit),
    offset : Number(page) * Number(limit)})
    : await Entity.findAll({
      where  : { portefeuilleId: id, archived: null},
      include: [Portefeuille, Statut],
      limit  : Number(limit),
      offset : Number(page) * Number(limit)
    });
}

async function count(prid) {
  return prid == 'null'
    ? await Entity.count({where: {archived: null}})
    : await Entity.count({
      where: {PortefeuilleId: prid, archived: null}
    });
}
