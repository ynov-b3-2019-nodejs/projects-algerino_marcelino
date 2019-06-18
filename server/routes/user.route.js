const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const roleCtrl = require('../controllers/role.controller');

const bcrypt = require('bcrypt');
const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', {session: false}));

router.route('/')
  .post(asyncHandler(insert));


async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

router.get('/', passport.authenticate('jwt', {session: false}), asyncHandler(list));

async function list(req, res) {
  res.json(await userCtrl.list());
}

router.get('/Roles', passport.authenticate('jwt', {session: false}), asyncHandler(listRoles));

async function listRoles(req, res) {
  res.json(await roleCtrl.list());
}

router.get('/:id', passport.authenticate('jwt', {session: false}), asyncHandler(get));

async function get(req, res) {
  res.json(await userCtrl.get(req.params.id));
}

router.post('/:id', passport.authenticate('jwt', {session: false}), asyncHandler(update));

async function update(req, res) {
  const entity = req.body;
  console.log("entity : ", entity);
  const user = await userCtrl.get(req.params.id);

  const roleIds = user.Roles.map(role => role.id);
  console.log("roleIds : ", roleIds);

  user.setRoles(entity.roles);

  if (entity.password) {
    user.hashedPassword = bcrypt.hashSync(entity.password, 10);
  }

  if (entity.email && user.email !== entity.email) {
    user.email = entity.email;
  }

  if (entity.fullname && user.fullname !== entity.fullname) {
    user.fullname = entity.fullname;
  }

  await userCtrl.update(user, req.params.id);

  res.json(user);
}

router.delete('/:id', passport.authenticate('jwt', {session: false}), asyncHandler(destroy));

async function destroy(req, res) {
  res.json(await userCtrl.destroy(req.params.id));
}
