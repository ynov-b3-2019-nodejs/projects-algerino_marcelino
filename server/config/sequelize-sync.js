const Portefeuille = require('../models/sequelize/portefeuille');
const Projet = require('../models/sequelize/projet');
const User = require('../models/sequelize/user');
const Livrable = require('../models/sequelize/livrable');
const Statut = require('../models/sequelize/statut');
const Role = require('../models/sequelize/roles');
const RolesUser = require('../models/sequelize/users_roles');
const Event = require('../models/sequelize/event');


Projet.hasMany(Event);
Event.belongsTo(Projet);

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

Event.belongsToMany(User, {
  through: 'UserEvent',
  foreignKey: 'eventId'
});

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
  await Role.sync();
  await Portefeuille.sync();
  await Projet.sync();
  await Livrable.sync();
  await RolesUser.sync();
  await Event.sync();
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
const roles = [
  {
    name:"Administrateur",
    code:"admin"
  },
  {
    name:"Responsable de portefeuille",
    code:"RPor"
  },
  {
    name:"Chef de projet",
    code:"RPro"
  },
  {
    name:"Responsable de livrable",
    code:"RLiv"
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

(async ()=> {
  for (let role of roles){
    const roleinDb = await Role.findOne({where: {code: role.code}});
    if(roleinDb === null){
      await Role.create(role);
    }
  }
})();

(async()=>{
  const userInDb = await User.findOne({where: {email: "t@t.com"}});
  if (userInDb === null) {
    const roleAdmin = await Role.findOne({where: {code: "admin"}});
    const user = await User.create({
      "email": "t@t.com",
      "fullname": "Test TEST",
      "hashedPassword": "$2b$10$25HEPOnHBvZOJ/vwrElxLO2ZpScUH3mv7NxtDQFbxUvtZ/0JgSheW",
    });

    user.setRoles([roleAdmin.id]);
  }
})();

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

module.exports = {
  Portefeuille,
  Projet,
  User,
  Livrable,
  Statut,
  Role
};
