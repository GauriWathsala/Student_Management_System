const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const TeacherContact = sequelize.define("TeacherContact", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  TeacherContact.associate = (models) => {
    TeacherContact.belongsTo(models.Teacher, {
      foreignKey: "teacherId",
      as: "teacher",
    });
  };

  return TeacherContact;
};
