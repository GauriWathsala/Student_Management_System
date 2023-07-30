const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Staff = Sequelize.define ("Staff", {
        userId:  {
            type :DataTypes.STRING(5),
            allowNull :false,
            primaryKey : true,
        },
        firstname:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        lastname:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        fullname:  {
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
            unique: true,
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
        qualifications: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          gender :{
            type :DataTypes.ENUM('Male','Female','Other'),
            allowNull : false,
          },
          password :{
            type :DataTypes.STRING,
            allowNull : false,
          },
          username :{
            type :DataTypes.STRING,
            allowNull : false,
          },
          userType :{
            type :DataTypes.ENUM('Teacher','Receptionist','Admin'),
            allowNull : false,
          },
          
    });

    
    Staff.associate = (models) => {
       Staff.hasOne(models.Admin, {
          foreignKey: 'userId', 
          as: 'admin',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
        Staff.hasOne(models.Teacher, {
          foreignKey: 'userId', 
          as: 'teacher',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
       Staff.hasOne(models.Receptionist, {
          foreignKey: 'userId', 
          as: 'receptionist',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
        Staff.belongsTo(models.User, {
            foreignKey: 'userId', 
            as: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          });
          Staff.hasMany(models.StaffContact, {
            foreignKey: 'userId',
            as: 'contacts',
            onDelete: 'CASCADE',
            onUpdate : 'CASCADE',
          });
      };

   
  

    return Staff
}