'use strict';

const Router = require('koa-router');
const { Training, Exercise, ExerciseInstance, ExerciseSet, User } = require('db');
const router = new Router();

router
  .get('/', async (ctx, next) => {
    const exercises = await Exercise.findAll({});
    ctx.body = exercises;
    ctx.status = 200;
  })
  .post('/', async (ctx, next) => {
    const { exercises, date } = ctx.request.body;
    if (exercises !== undefined) &&  (date !== undefined) {
      const training = await Training.create({ "date": date });
      exercises.forEach(async ({ id, sets }) => {
        const exercise = await Exercise.findOne({ where: { id: id } });
        const createdSets = createSets(sets);
        const exInstance = await ExerciseInstance.create();
        exInstance.addExercice(exercise);
        exInstance.addSets(createSets);
        training.addExercice(exInstance);
        ctx.status = 201;
        ctx.body = training;
      });
    }
    else {
      ctx.status = 400;
    }
  });

async createSets(sets) {
  const result = sets.map(async (set) => {
    const createdSet = await ExerciseSet.create(set);
    return createSet;
  });
  return await Promise.all(result);
}

module.exports = router;


/*
date: Date,
exercises: Array
exercises[][id]
