const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentScheduleExams = sequelize.define("StudentScheduleExams", {
    stuId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    scheduleId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    
  });

  return StudentScheduleExams;
};