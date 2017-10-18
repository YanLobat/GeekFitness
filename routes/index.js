'use strict';

const Router = require('koa-router');
const exercises = require('./exercise');
const trainings = require('./training');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log('I am here!');
    ctx.body = { "message": "Hello Koa!" };
    ctx.status = 200;
  })
  .use(exercises.routes())
  .use(exercises.allowedMethods())
  .use(trainings.routes())
  .use(trainings.allowedMethods());

module.exports = router;
