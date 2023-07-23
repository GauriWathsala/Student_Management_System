const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CourseBook = sequelize.define("CourseBook", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return CourseBook;
};
