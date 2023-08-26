const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Module = Sequelize.define ("Module", {
        moduleId:  {
            type :DataTypes.STRING,
            allowNull :false,
            primaryKey: true,
        },
        moduleName:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
});

Module.associate = (models) => {
    Module.belongsToMany(models.Course, {
      through: models.CourseModule,
      foreignKey: "moduleId",
      otherKey: "courseId",
      as: "courses",
    });
 Module.belongsTo(models.Teacher, {
      foreignKey: 'teacherId',
      as: 'teacher',
    });

  };

return Module
}