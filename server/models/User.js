const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      userId: {
        type: DataTypes.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      username:{
        type:DataTypes.STRING,
        allowNull :false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });

    User.associate = (models) => {
      User.hasOne(models.Admin, {
        foreignKey: 'userId', 
        as: 'admin',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasOne(models.Teacher, {
        foreignKey: 'userId', 
        as: 'teacher',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasOne(models.Receptionist, {
        foreignKey: 'userId', 
        as: 'receptionist',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    };
    

     
    return User;
  };
  