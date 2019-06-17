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
  return await Entity.update(entity, {where: {id: entity.id}});
}

async function destroy(id) {
  return await Entity.destroy({where: {id: id}});
}

async function get(id) {
  return await Entity.findOne({ where: { id: id }, include: [Projet, Statut] });
}

async function list(id, page, limit) {
  return await Entity.findAll({
    where: { ProjetId: id },
    include: [Projet, Statut],
    limit: Number(limit),
    offset: Number(page) * Number(limit) });
}


async function count() {
  return await Entity.count();
}



// id	nom	dateprevu	datefin	createdAt	updatedAt	ProjetId	StatutId
