"use strict";

module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define("Training",
    {
      date: DataTypes.DATEONLY,
    },
    {
      classMethods: {
        associate(models) {
          Training.hasMany(models.ExerciseInstance, {as: "exercises"});
        }
      }
    }
  );

  return Training;
};
