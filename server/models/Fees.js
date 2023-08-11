const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Fees = sequelize.define("Fees", {
    feeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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

 

  return Fees;
};
