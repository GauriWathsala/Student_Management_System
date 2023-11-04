

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  studentsCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: "09:00:00",
  },
});

PlacementTestAvailability.associate = (models) => {
  PlacementTestAvailability.belongsTo(models.ExamDetails, {
    foreignKey: "examId",
    as: "placementTest",
  });
  PlacementTestAvailability.belongsToMany(models.Student, {
    through: "SchedulePlacementTest",
    foreignKey: "availabilityId",
    otherKey: "stuId",
    as: "students",
  });

};

return PlacementTestAvailability;
};
