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
  
    return User;
  };
  