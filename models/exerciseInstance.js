"use strict";

module.exports = (sequelize, DataTypes) => {
  const ExerciseInstance = sequelize.define("ExerciseInstance", {},
    {
      classMethods: {
        associate(models) {
          ExerciseInstance.hasOne(models.Exercise, { as: "exercise" });
          ExerciseInstance.hasMany(models.ExerciseSet, { as: "sets"});
        }
      }
    }
  );

  return ExerciseInstance;
};
