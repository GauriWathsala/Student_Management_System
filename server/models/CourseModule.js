const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CourseModule = sequelize.define("CourseModule", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return CourseModule;
};
