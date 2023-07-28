const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Payment = sequelize.define("Payment", {
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    amountPaid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentType :{
        type : DataTypes.ENUM ('Installment','Full'),
        allowNull: false,
    },
    paymentMethod :{
        type : DataTypes.ENUM ('Bank','Online', 'Cash'),
        allowNull: false,
    }
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Student, {
      foreignKey: "studentId",
      as: "student",
    });
    Payment.belongsTo(models.Fees, {
      foreignKey: "feeId",
      as: "fee",
    });
  };

  return Payment;
};
