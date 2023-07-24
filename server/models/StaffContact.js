const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const StaffContact = sequelize.define("StaffContact", {
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

  StaffContact.associate = (models) => {
    StaffContact.belongsTo(models.Staff, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return StaffContact;
};
