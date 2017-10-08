'use strict';

const Router = require('koa-router');
const exercises = require('./exercise');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log('I am here!');
    ctx.body = { "message": "Hello Koa!" };
    ctx.status = 200;
  })
  .use(exercises.routes())
  .use(exercises.allowedMethods());

module.exports = router;
