const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const ScheduleExam = Sequelize.define ("ScheduleExam", {
        sId:{
            type :DataTypes.STRING,
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
        },
        registeredStudents: {
            type: DataTypes.INTEGER,
            defaultValue: 0, 
          },
        
    });

    ScheduleExam.associate = (models) => {
        ScheduleExam.belongsTo(models.ExamDetails, {
          foreignKey: "examId",
          as: "exam",
        });
      };

    return ScheduleExam
}