"use strict";

module.exports = (sequelize, DataTypes) => {
  const Training = sequelize.define("Training",
    {
      date: DataTypes.DATEONLY
      exercises:
    },
    {
      classMethods: {
        associate(models) {
          Exercise.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
    }
  );

  return Exercise;
};
