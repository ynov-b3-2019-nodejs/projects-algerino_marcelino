let Entity = require('../models/sequelize/portefeuille');
const Statut = require('../models/sequelize/statut');
const Projet = require('../models/sequelize/projet');


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

async function update(entity, id) {
  return await Entity.update(entity, {where: {_id: id}});
}

async function destroy(id) {
  return await Entity.destroy({where: {_id: id}});
}

async function get(id) {
  return await Entity.findOne({where: {_id: id}, include:[Projet]});
}

async function list() {
  return await Entity.findAll({include: [Statut]});
}
