'use strict';

const Router = require('koa-router');
const { Exercise } = require('db');
const router = new Router({
  prefix: '/exercises'
});

router
  .get('/', async (ctx, next) => {
    const exercises = await Exercise.findAll({});
    ctx.body = exercises;
    ctx.status = 200;
  })
  .post('/', async (ctx, next) => {
    const exercise = await Exercise.create(ctx.request.body);
    ctx.body = exercise.id;
    ctx.status = 201;
  });
module.exports = router;
