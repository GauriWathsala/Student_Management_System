const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const ScheduleExam = Sequelize.define ("ScheduleExam", {
      scheduleExamId:{
            type :DataTypes.INTEGER,
            allowNull :false,
            primaryKey: true,
            autoIncrement: true,
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull :false,
        },
        startTime:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM(
                "Scheduled",
                "Faced",
                "Not Sat",
                "Canceled",
                "Marks Released",
              ),
            allowNull: false,
        },
       
        
    });

    ScheduleExam.associate = (models) => {
        ScheduleExam.belongsTo(models.ExamDetails, {
          foreignKey: "examId",
          as: "exam",
        });
        ScheduleExam.belongsToMany(models.Student, {
          through: "StudentScheduleExams",
          foreignKey: " scheduleId",
          otherKey: " stuId",
          as: "students",
        });
      };

    return ScheduleExam
}