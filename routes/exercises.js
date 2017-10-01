'use strict';

const Router = require('koa-router');
const { Exercise, User, Training, ExerciseInstance } = require('db');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    console.log('I am hre');
    const exercises = await Exercise.findAll({});
    ctx.body = exercises;
    ctx.status = 200;
  })
  .post('/', async (ctx, next) => {
    const time = new Date();
    const user = await User.create({ "username": "Yan" });
    const training = await Training.create({ "date": time  });
    const exerciseInstance = await ExerciseInstance.create();
    const exercise = await Exercise.create(ctx.request.body);
    console.log(exercise);
    ctx.body = exercise.id;
    ctx.status = 201;
  });

module.exports = router;
