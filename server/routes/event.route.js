const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const EntityController = require('../controllers/event.controller');

const router = express.Router();
module.exports = router;


router.get('/', passport.authenticate('jwt', { session: false }), asyncHandler(list));
async function list(req, res) {
  res.json(await EntityController.list());
}

router.post('/', passport.authenticate('jwt', { session: false }), asyncHandler(create));
async function create(req, res) {
  res.json(await EntityController.insert(req.body));
}

router.patch('/', passport.authenticate('jwt', { session: false }), asyncHandler(update));
async function update(req, res) {
  res.json(await EntityController.update(req.body));
}

