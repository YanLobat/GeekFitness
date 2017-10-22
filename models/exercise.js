"use strict";

module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise",
    {
      title: DataTypes.STRING,
      group: DataTypes.ENUM('back', 'legs', 'chest', 'bicep', 'tricep', 'shoulders', 'forearm')
    },
    {
      classMethods: {
        associate(models) {
          Exercise.hasMany(models.ExerciseInstance, { as: "instances" });
        }
      }
    }
  );
  return Exercise;
};
