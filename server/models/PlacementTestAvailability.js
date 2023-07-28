const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const PlacementTestAvailability = sequelize.define("PlacementTestAvailability", {
    availabilityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    morningSlotAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    afternoonSlotAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    morningSlotStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    afternoonSlotStudents: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  PlacementTestAvailability.associate = (models) => {
    // Associate with ExamDetails (Placement Test)
    PlacementTestAvailability.belongsTo(models.ExamDetails, {
      foreignKey: "examId",
      as: "placementTest",
    });
  };

  return PlacementTestAvailability;
};
