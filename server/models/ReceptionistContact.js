const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ReceptionistContact = sequelize.define("ReceptionistContact", {
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

  ReceptionistContact.associate = (models) => {
    ReceptionistContact.belongsTo(models.Receptionist, {
      foreignKey: "receptionistId",
      as: "receptionist",
    });
  };

  return ReceptionistContact;
};
