const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
    const Teacher = Sequelize.define ("Teacher", {
        teacherId:  {
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
        qualifications: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          gender :{
            type :DataTypes.ENUM('Male','Female','Other'),
            allowNull : false,
          },
          
    });

    Teacher.associate = (models) => {
        Teacher.hasMany(models.TeacherContact, {
          foreignKey: 'teacherId',
          as: 'contacts',
          onDelete: 'CASCADE',
          onUpdate : 'CASCADE',
        });
        Teacher.hasMany(models.Module, {
          foreignKey: 'teacherId',
          as: 'modules',
        });
        Teacher.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate : 'CASCADE',
        });
        Teacher.belongsTo(models.Staff, {
          foreignKey: 'userId',
          as: 'staff',
          onDelete: 'CASCADE',
          onUpdate : 'CASCADE',
          });
    }; 

   
  

    return Teacher
}