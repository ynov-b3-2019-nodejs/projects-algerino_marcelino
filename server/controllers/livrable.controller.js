let Entity = require('../models/sequelize/livrable');
const Statut = require('../models/sequelize/statut');
const Projet = require('../models/sequelize/projet');

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
  return await Entity.update(entity, {where: {id: entity.id, archived: null}});
}

async function destroy(id) {
  return await entity.update({archived: true},{where: id});
}

async function get(id) {
  return await Entity.findOne({ where: { id: id, archived: null}, include: [Projet, Statut] });
}

async function list(id, page, limit) {
  return id == 'null'
    ? Entity.findAll({
      where: { archived: null },
      include: [Projet, Statut],
      limit: Number(limit),
      offset: Number(page) * Number(limit) })
    : await Entity.findAll({
    where: { ProjetId: id, archived: null },
    include: [Projet, Statut],
    limit: Number(limit),
    offset: Number(page) * Number(limit) });
}

async function count(prid) {
  return prid != 'null'
    ? await Entity.count({
      where: {ProjetId: prid, archived: null}
    })
    : await Entity.count({archived: null});
}

// id	nom	dateprevu	datefin	createdAt	updatedAt	ProjetId	StatutId
