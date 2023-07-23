const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Result = Sequelize.define ("Result", {
        resultId:{
            type: DataTypes.INTEGER,
            allowNull :false,
            primaryKey: true,
        },
        Marks:{
            type: DataTypes.INTEGER,
            allowNull :false,
        },
        noAttempts:{
            type: DataTypes.INTEGER,
            allowNull :false,
        }
    });

    Result.associate = (models) => {
        Result.belongsTo(models.ExamDetails, {
          foreignKey: "examId",
          as: "exam",
        });
      };

    return Result
}