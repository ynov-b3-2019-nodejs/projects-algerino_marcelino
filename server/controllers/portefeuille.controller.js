const Entity = require('../models/sequelize/portefeuille');
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

async function update(entity, id) {
  return await Entity.update(entity, {where: {id: id, archived: null}});
}

async function destroy(id) {
  return await Entity.update({archived: true}, {where: {id: id}});
}

async function get(col, val) {
  return await Entity.findOne(
    {
      where: {[col]: val, archived: null},
      include: [
        Statut,
        {
          model: Projet,
          include: [
            Statut
          ]
        }
        ]
    }
    );
}

async function list(limit, page) {
  return await Entity.findAll({
    where: {archived: null},
    include: Statut,
    limit: Number(limit),
    offset: Number(page) * Number(limit)
  });
}

async function count() {
  return await Entity.count({where: {archived: null}});
}
