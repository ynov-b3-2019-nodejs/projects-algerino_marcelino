const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const EntityController = require('../controllers/projet.controller');

const router = express.Router();
module.exports = router;

router.get('/detail/:portefeuilleId', passport.authenticate('jwt', { session: false }), asyncHandler(get));
async function get(req, res) {
  res.json(await EntityController.get(req.params.portefeuilleId));
}

router.get('/count', asyncHandler(count));
async function count(req, res) {
  res.send(200, await EntityController.count());
}

router.get('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(list));
async function list(req, res) {
  res.json(await EntityController.list(req.params.id, req.query.page, req.query.limit));
}

router.patch('/', passport.authenticate('jwt', { session: false }), asyncHandler(update));
async function update(req, res) {
  res.json(await EntityController.update(req.body));
}

router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(create));
async function create(req, res) {
  res.json(await EntityController.insert(req.body));
}

router.delete('/:id', passport.authenticate('jwt', { session: false }), asyncHandler(destroy));
async function destroy(req, res) {
  res.json(await EntityController.destroy(req.params.id));
}
