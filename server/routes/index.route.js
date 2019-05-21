const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const portefeuille = require('./portefeuille.route');
const projet = require('./projet.route');
const livrable = require('./livrable.route');
const statut = require('./statut.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/portefeuille', portefeuille);
router.use('/projet', projet);
router.use('/livrable', livrable);
router.use('/statut', statut);

module.exports = router;
