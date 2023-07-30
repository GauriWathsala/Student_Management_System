const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Fees = sequelize.define("Fees", {
    feeId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    feeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    
  });

  Fees.associate = (models) => {
    Fees.hasMany(models.Payment, {
      foreignKey: "feeId",
      as: "payments",
    });
    Fees.belongsTo(models.Course, {
      foreignKey: "feeType",
      targetKey: "courseId",
      as: "course",
    });
  };

  return Fees;
};
