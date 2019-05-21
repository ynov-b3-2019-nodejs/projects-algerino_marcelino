const path = require('path');
const express = require('express');
const httpError = require('http-errors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('../routes/index.route');
const config = require('./config');
const passport = require('./passport');

const Portefeuille = require('../models/sequelize/portefeuille');
const Projet = require('../models/sequelize/projet');
const User = require('../models/sequelize/user');
const Livrable = require('../models/sequelize/livrable');
const Statut = require('../models/sequelize/statut');

Portefeuille.hasMany(Projet);
Projet.belongsTo(Portefeuille);

Projet.hasMany(Livrable);
Livrable.belongsTo(Projet);

Statut.hasMany(Portefeuille);
Portefeuille.belongsTo(Statut);

Statut.hasMany(Projet);
Projet.belongsTo(Statut);

Statut.hasMany(Livrable);
Livrable.belongsTo(Statut);

Portefeuille.belongsToMany(User, {
  through: 'UserPortefeuille',
  foreignKey: 'portefeuilleId'
});

User.belongsToMany(Portefeuille, {
  through: 'UserPortefeuille',
  foreignKey: 'userId'
});

Projet.belongsToMany(User, {
  through: 'UserProject',
  foreignKey: 'projetId'
});

User.belongsToMany(Projet, {
  through: 'UserProject',
  foreignKey: 'userId'
});
(async function () {
  await Statut.sync();
  await User.sync();
  await Portefeuille.sync();
  await Projet.sync();
  await Livrable.sync();
})();
const statuts = [
  {
    nom: "Clarification",
    code: "Clarification"
  },
  {
    nom: "Abandonné",
    code: "Abandoned"
  },
  {
    nom: "Clos",
    code: "Closed"
  },
  {
    nom: "En cours",
    code: "InProgress"
  },
  {
    nom: "A débuter",
    code: "ToBeStarted"
  },
  {
    nom: "GO",
    code: "Go"
  },
  {
    nom: "NO GO",
    code: "NoGo"
  },
  {
    nom: "En attente de validation",
    code: "AwaitingValidation"
  },
  {
    nom: "Commande à réaliser",
    code: "OrderToBeCarriedOut"
  },
];

(async function (statuts, Statut) {
  for (let statut of statuts) {
    const statutInDb = await Statut.findOne({where: {code: statut.code}});
    if (statutInDb === null) {
      Statut.create(statut);
    }
  }
})(statuts, Statut);
(async function (Portefeuille) {
  const portefeuilles = [
    {
      nom: "TEST 1"
    },
    {
      nom: "TEST 2"
    }
  ];
  for (let portefeuille of portefeuilles) {
    const portefeuilleInDb = await Portefeuille.findOne({where: {nom: portefeuille.nom}});
    if (portefeuilleInDb === null) {
      Portefeuille.create(portefeuille);
    }
  }
})(Portefeuille);

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// Choose what fronten framework to serve the dist from
var distDir = '../../dist/';
if (config.frontend == 'react') {
  distDir = '../../node_modules/material-dashboard-react/dist'
} else {
  distDir = '../../dist/';
}

// 
app.use(express.static(path.join(__dirname, distDir)))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, distDir + '/index.html'));
});

console.log(distDir);
//React server
app.use(express.static(path.join(__dirname, '../../node_modules/material-dashboard-react/dist')))
app.use(/^((?!(api)).)*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API router
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new httpError(404)
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {

  // customize Joi validation errors
  if (err.isJoi) {
    err.message = err.details.map(e => e.message).join("; ");
    err.status = 400;
  }

  res.status(err.status || 500).json({
    message: err.message
  });
  next(err);
});

module.exports = app;
