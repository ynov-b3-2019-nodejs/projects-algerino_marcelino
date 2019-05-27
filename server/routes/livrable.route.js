const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const EntityController = require('../controllers/livrable.controller');

const router = express.Router();
module.exports = router;

router.get('/:projetId', passport.authenticate('jwt', { session: false }), asyncHandler(list));
async function list(req, res) {
  res.json( await EntityController.list(req.params.projetId));
}

router.get('/detail/:id', passport.authenticate('jwt', { session: false }), asyncHandler(get));
async function get(req, res) {
  res.json( await EntityController.get(req.params.id));
}

router.patch('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(update));
async function update(req, res) {
  res.json( await EntityController.update(req.body, req.params.id));
}

router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(create));
async function create(req, res) {
  res.json( await EntityController.insert(req.body));
}

router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(destroy));
async function destroy(req, res) {
  res.json( await EntityController.destroy(req.params.id));
}
