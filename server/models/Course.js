const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Course = Sequelize.define ("Course", {
        courseId:  {
            type :DataTypes.STRING,
            allowNull :false,
            primaryKey: true,
        },
        courseName:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        courseFee:  {
            type :DataTypes.DECIMAL(10,2),
            allowNull :false,
        },
        courseDuration:  {
            type :DataTypes.INTEGER,
            allowNull :false,
        },
        durationType: {
            type : DataTypes.ENUM('Days','Months','years', 'Hours'),
            allowNull :false,
        },
        

    });

    Course.associate = (models) => {
        Course.belongsToMany(models.Module, {
          through: models.CourseModule,
          foreignKey: "courseId",
          otherKey: "moduleId",
          as: "modules",
        });
        Course.belongsToMany(models.Book, {
            through: "CourseBooks",
            foreignKey: "courseId",
            otherKey: "bookId",
            as: "books",
        });
        Course.hasMany(models.Student, {
            foreignKey: 'courseId',
            as: 'students',
          });

          Course.hasOne(models.Fees, {
            foreignKey: "feeType",
            sourceKey: "courseId",
            as: "fee",
        });
      };

    return Course
}