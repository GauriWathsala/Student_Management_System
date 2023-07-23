const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const ExamDetails = Sequelize.define ("ExamDetails", {
        examId: {
            type :DataTypes.STRING(5),
            allowNull :false,
            primaryKey: true,
        },
        examName: {
            type :DataTypes.STRING(5),
            allowNull :false,
        },
        duration:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        examType:{
            type: DataTypes.ENUM(
                "Placement Test",
                "Mock Exam",
                "Final Exam",
                "In-class Test",
                "Mid Exam",
              ),
            allowNull: false,
        }
    });

    ExamDetails.associate = (models) => {
        ExamDetails.hasMany(models.ScheduleExam, { 
            foreignKey: "examId",
            as: 'exams', 
        });
        ExamDetails.hasMany(models.Result, { 
            foreignKey: "examId",
            as: 'results' 
        });
    }

    return ExamDetails
}