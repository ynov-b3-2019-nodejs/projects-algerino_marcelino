const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');

const UserSeq = require('../models/sequelize/user');
const config = require('./config');

const localLogin = new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  let user = await UserSeq.findOne({where:{email}});
  if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
    return done(null, false, {error: 'Your login details could not be verified. Please try again.'});
  }
  delete user.hashedPassword;
  done(null, user);
});

const jwtLogin = new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  console.log("payload : ", payload);
  let user = await UserSeq.findOne({where:{email: payload.email}});
  if (!user) {
    return done(null, false);
  }
  delete user.hashedPassword;
  done(null, user);
});

passport.use(jwtLogin);
passport.use(localLogin);

module.exports = passport;
