const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const EntityController = require('../controllers/portefeuille.controller');

const router = express.Router();
module.exports = router;

router.get('/', passport.authenticate('jwt', { session: false }), asyncHandler(list));
async function list(req, res) {
  console.log("OK 1");
  res.json(await EntityController.list());
}

router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(get));
async function get(req, res) {
  res.json(await EntityController.get(req.params.id));
}

router.put('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(update));
async function update(req, res) {
  console.log('BODY ==> ', req.body);
  res.json(await EntityController.update(req.body, req.params.id));
}

router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(create));
async function create(req, res) {
  res.json(await EntityController.insert(req.body));
}

router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(destroy));
async function destroy(req, res) {
  res.json(await EntityController.destroy(req.params.id));
}
