let Entity = require('../models/sequelize/event');
const Projet = require('../models/sequelize/projet');


module.exports = {
  list,
  insert,
  update,
  detail,
  destroy
};

async function list() {
  return await Entity.findAll({include: [Projet]});
}

async function insert(entity) {
  return await Entity.create(entity);
}

async function update(entity) {
  return await Entity.update(entity, { where: { id: entity.id } });
}

async function detail(eventId) {
  return await Entity.findOne({
    where: { id: eventId },
    include: [Projet] });
}

async function destroy(id) {
  return await Entity.destroy({ where: { id: id } });
}



