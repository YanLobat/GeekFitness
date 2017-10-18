"use strict";

module.exports = (sequelize, DataTypes) => {
  const ExerciseSet = sequelize.define("ExerciseSet",
    {
      weight: DataTypes.FLOAT,
      repetitions: DataTypes.INTEGER
    }
  );

  return ExerciseSet;
};
