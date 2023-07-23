const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Receptionist = Sequelize.define ("Receptionist", {
        receptionistId:  {
            type :DataTypes.STRING(5),
            allowNull :false,
            primaryKey : true,
        },
        name:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
       address:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        nic:  {
            type :DataTypes.STRING,
            allowNull :false,
            validate: {
                isNICFormat(value) {
                  const is10CharacterNIC = value.length === 10 && /[0-9]{9}[Vv]/.test(value);
                  const is12CharacterNIC = value.length === 12 && /[0-9]{12}/.test(value);
                  if (!is10CharacterNIC && !is12CharacterNIC) {
                    throw new Error("NIC format is invalid. Please enter a valid NIC.");
                  }
                },
              },
        },
        dob:  {
            type :DataTypes.DATE,
            allowNull :false,
        },
        
        email:  {
            type :DataTypes.STRING,
            allowNull :false,
        },

        salary:{
            type :DataTypes.DECIMAL(10,2),
            allowNull :false,
        },
        gender :{
          type : DataTypes.STRING,
          allowNull :false, 
        },
        qualification :{
          type : DataTypes.TEXT,
          allowNull :true,
        }
        
    });

    Receptionist.associate = (models) => {
        Receptionist.hasMany(models.ReceptionistContact, {
          foreignKey: 'receptionistId',
          as: 'contacts',
          onDelete: 'CASCADE',
      onUpdate : 'CASCADE',
          });
        Receptionist.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user',
          onDelete: 'CASCADE',
          onUpdate : 'CASCADE',
        });
      };

      
    

    return Receptionist
}