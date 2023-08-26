const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StudentScheduleExams = sequelize.define("StudentScheduleExams", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("Faced", "Not Faced"),
      allowNull: false,
    },
    marks: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: true,
    },
    
  });

  StudentScheduleExams.associate = (models) => {
    StudentScheduleExams.belongsTo(models.Module, {
      foreignKey: "moduleId",
      as: "module",
    }); 
    StudentScheduleExams.belongsTo(models.ScheduleExam, {
      foreignKey: "scheduleId",
      as: "exams",
    }); 
    StudentScheduleExams.belongsTo(models.Student, {
      foreignKey: "stuId",
      as: "student",
    }); 
    

   
  }

  return StudentScheduleExams;
};