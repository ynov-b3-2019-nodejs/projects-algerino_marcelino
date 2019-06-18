const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  SEQ_URL: Joi.string().required()
    .description('Mysql url'),
  SEQ_USR: Joi.string().required()
    .description('Mysql user'),
  SEQ_DB: Joi.string().required()
    .description('Mysql DB'),
  SEQ_PWD: Joi.string()
    .description('Mysql PWD'),
  SOCKET_PORT: Joi.string()
    .description('SOCKET PORT')
}).unknown()
  .required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  socketPort: envVars.SOCKET_PORT,
  jwtSecret: envVars.JWT_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  sequelize: {
    usr: envVars.SEQ_USR,
    db: envVars.SEQ_DB,
    pwd: envVars.SEQ_PWD,
    url: envVars.SEQ_URL
  }
};

module.exports = config;
