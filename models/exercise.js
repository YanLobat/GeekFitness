"use strict";

module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise", {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // Using additional options like CASCADE etc for demonstration
        // Can also simply do Task.belongsTo(models.User);
        Exercise.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Exercise;
};
