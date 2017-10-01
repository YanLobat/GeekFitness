'use strict';

const Router = require('koa-router');
const { Exercise } = require('db');
console.log(Exercise.toString());
const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log('I am hre');
    const exercises = await Exercise.findAll({});
    ctx.body = exercises;
    ctx.status = 200;
  })
  .post('/', async (ctx, next) => {
    const exercise = await Exercise.create(ctx.body);
    console.log(exercise);
    ctx.body = exercise.id;
    ctx.status = 201;
  });

module.exports = router;
