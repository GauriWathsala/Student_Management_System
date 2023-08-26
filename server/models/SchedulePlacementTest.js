const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const SchedulePlacementTest = sequelize.define("SchedulePlacementTest", {
   
    state: {
      type: DataTypes.ENUM("Faced", "Not Face"),
      allowNull: false,
    },
    marks: {
      type: DataTypes.DECIMAL(3,2),
      allowNull: true,
      
    },
   
  });


  return SchedulePlacementTest;
};