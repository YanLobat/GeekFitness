'use strict';

const Router = require('koa-router');
const { Training, Exercise, ExerciseInstance, ExerciseSet, User } = require('db');
const router = new Router({
  prefix: '/trainings'
});

router
  .get('/', async (ctx, next) => {
    const trainings = await Training.findAll({include: [{model: ExerciseInstance, as: 'exercises', include: [{model: ExerciseSet, as: 'sets'}]}]});
    ctx.body = trainings;
    ctx.status = 200;
  })
  .post('/', async (ctx, next) => {
    const { exercises, date } = ctx.request.body;
    if ((exercises !== undefined) &&  (date !== undefined)) {
      const createdInstances = await createInstances(exercises);
      const training = await Training.create({
        "date": date
      });
      const check = await training.setExercises(createdInstances);
      ctx.status = 201;
      ctx.body = training;
    }
    else {
      ctx.status = 400;
    }
  });

async function createSets(sets) {
  const result = sets.map(async (set) => {
    const createdSet = await ExerciseSet.create(set);
    return createdSet;
  });
  return await Promise.all(result);
}

async function createInstances(exercises) {
  const result = exercises.map(async (exerciseItem) => {
    const id = exerciseItem.exercise.id;
    const sets = exerciseItem.sets;
    const exercise = await Exercise.findOne({ where: { id: id } });
    const createdSets = await createSets(sets);
    const exInstance = await ExerciseInstance.create({});
    await exInstance.setSets(createdSets);
    await exercise.addInstance(exInstance);
    return exInstance;
  });
  return await Promise.all(result);
}

module.exports = router;


/*
date: Date,
exercises: Array
exercises[][id]
*/
