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
        // startTime:{
        //   type: DataTypes.DATE,
        //   allowNull: false,
        //   defaultValue: new Date().setHours(9, 0, 0, 0),
        // }

  });

  PlacementTestAvailability.associate = (models) => {
    PlacementTestAvailability.belongsTo(models.ExamDetails, {
      foreignKey: "examId",
      as: "placementTest",
    });
    PlacementTestAvailability.hasMany(models.Student, { 
      foreignKey: " availabilityId",
      as: 'students', 
  });
  };

  return PlacementTestAvailability;
};
