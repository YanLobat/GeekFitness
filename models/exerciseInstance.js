"use strict";

module.exports = (sequelize, DataTypes) => {
  const ExerciseSet = sequelize.define("ExerciseSet",
    {
      weight: DataTypes.FLOAT,
      repetitions: DataTypes.INTEGER
    }
  );
  const ExerciseInstance = sequelize.define("ExerciseInstance", {},
    {
      classMethods: {
        associate(models) {
          ExerciseInstance.hasOne(models.Exercise, { as: "exercise" });
          ExerciseInstance.hasMany(ExerciseSet, { as: "sets" });
        }
      }
    }
  );

  return ExerciseInstance;
};
