"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User",
    {
      username: DataTypes.STRING,
    },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Training, {as: "trainings"});
        }
      }
  });

  return User;
};
