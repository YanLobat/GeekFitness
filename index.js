const https = require('https');
const querystring = require('querystring');
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const Sequelize = require('sequelize');
const axios = require('axios');

const router = require('./routes');
const { sequelize, User } = require('./db');
const githubMiddleware = require('auth/github');
const { clientID, clientSecret, stateStr } = require('./config');

const app = new Koa();

app.keys = ['archloh eto pidoras'];

app
  .use(helmet())
  .use(session(app))
  .use(bodyParser())
  // .use(githubMiddleware())
  .use(router.routes())
  .use(router.allowedMethods())

sequelize
  .sync(/*{force: true}*/)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    throw new Error(err);
  });
