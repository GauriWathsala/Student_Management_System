const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const ScheduleExam = Sequelize.define ("ScheduleExam", {
        sId:{
            type :DataTypes.INTEGER(6),
            allowNull :false,
            primaryKey: true,
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
        }
        
    });

    ScheduleExam.associate = (models) => {
        ScheduleExam.belongsTo(models.ExamDetails, {
          foreignKey: "examId",
          as: "exam",
        });
      };

    return ScheduleExam
}