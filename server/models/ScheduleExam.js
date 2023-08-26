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
        duration:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        startTime:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        status:{
            type: DataTypes.ENUM(
                "Scheduled",
                "Canceled",
                "Completed",
              ),
            allowNull: false,
        },
     });

    ScheduleExam.associate = (models) => {
      ScheduleExam.belongsTo(models.Course, {
          foreignKey: "courseId",
          as: "course",
        }); 
        ScheduleExam.hasMany(models.StudentScheduleExams, {
          foreignKey: 'scheduleExamId',
          as: 'studentExams',
      });

      };

    return ScheduleExam
}