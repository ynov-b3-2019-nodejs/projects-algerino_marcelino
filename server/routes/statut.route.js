const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const EntityController = require('../models/sequelize/statut');

const router = express.Router();
module.exports = router;

router.get('/', passport.authenticate('jwt', { session: false }), asyncHandler(list));
async function list(req, res) {
  res.json(await EntityController.findAll());
}

