const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AdminContact = sequelize.define("AdminContact", {
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

  AdminContact.associate = (models) => {
    AdminContact.belongsTo(models.Admin, {
      foreignKey: "adminId",
      as: "admin",
    });
  };

  return AdminContact;
};
