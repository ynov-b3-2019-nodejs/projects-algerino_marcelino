const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const EntityController = require('../controllers/projet.controller');

const router = express.Router();
module.exports = router;

router.get('/', passport.authenticate('jwt', { session: false }), asyncHandler(list));
async function list(req, res) {
  res.json(EntityController.list());
}

router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(get));
async function get(req, res) {
  res.json(EntityController.get(req.params.id));
}

router.post('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(update));
async function update(req, res) {
  res.json(EntityController.update(req.body, req.params.id));
}

router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(create));
async function create(req, res) {
  res.json(EntityController.create(req.body));
}

router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(destroy));
async function destroy(req, res) {
  res.json(EntityController.destroy(req.params.id));
}
