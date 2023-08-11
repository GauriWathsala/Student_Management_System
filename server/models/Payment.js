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
    paymentType :{
        type : DataTypes.ENUM ('Installment','Full payment'),
        allowNull: false,
    },
    paymentMethod :{
        type : DataTypes.ENUM ('Bank Payment','Online Payment', 'Cash Payment'),
        allowNull: false,
    },
    details :{
      type : DataTypes.ENUM ('Registration Fee','Exam Fee', 'Course Fee'),
      allowNull: false,
  }
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Student, {
      foreignKey: "stuId",
      as: "student",
    });
  
  };

  return Payment;
};
