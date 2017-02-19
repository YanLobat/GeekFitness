const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const Sequelize = require('sequelize');

const router = require('./routes');
const db = require('./db');

const app = new Koa();



app.use(helmet());
app.use(bodyParser());
app.use(router.routes());

db.sequelize
  .sync(/*{force: true}*/)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    throw new Error(err);
  });
