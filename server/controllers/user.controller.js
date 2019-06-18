const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserSeq = require('../models/sequelize/user');
const RolesSeq = require('../models/sequelize/roles');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  roles: Joi.array().items(Joi.number()).required(),
});


module.exports = {
  insert,
  update,
  destroy,
  get,
  list
};

async function insert(user) {
  delete user.id;
  delete user.repeatPassword;
  console.log(user);
  if(!user.roles){
    user.roles = [];
  }
  user = await Joi.validate(user, userSchema, {abortEarly: false});
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  const userCreate = await UserSeq.create(user);
  userCreate.setRoles(user.roles);
  return userCreate;
}

async function update(entity, id) {
  return await UserSeq.update(entity, {where: {id, archived: null}});
}

async function destroy(id) {
  return await UserSeq.update({archived: true}, {where: {id: id}});
}

async function get(id) {
  return await UserSeq.findOne({where: {id: id, archived: null}, include: [RolesSeq]});
}

async function list() {
  return await UserSeq.findAll({include: [RolesSeq], where: {archived: null}});
}

