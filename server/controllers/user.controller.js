const bcrypt = require('bcrypt');
const Joi = require('joi');
const UserSeq = require('../models/sequelize/user');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password'))
});


module.exports = {
  insert
};

async function insert(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  console.log("Create User : ", user);
  await UserSeq.create(user);
  return user;
}
