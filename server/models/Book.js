const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Book = Sequelize.define ("Book", {
        bookId:  {
            type :DataTypes.STRING(5),
            allowNull :false,
            primaryKey : true,
        },
        bookName :{
            type : DataTypes.STRING,
            allowNull :false,
        },
        quantity : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0,
        }
    });

    Book.associate = (models) => {
        Book.belongsToMany(models.Course, {
          through: models.CourseBook,
          foreignKey: "bookId",
          otherKey: "courseId",
          as: "courses",
        });
      };

    return Book;
}