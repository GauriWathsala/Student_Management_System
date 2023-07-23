const { DataTypes } = require("sequelize");


module.exports = (sequelize,DataTypes) => {
    const Student = sequelize.define ("Student", {
        stuId:  {
            type :DataTypes.STRING,
            allowNull :false,
            primaryKey: true,
        },
        name:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        nic:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        dob:  {
            type :DataTypes.DATE,
            allowNull :false,
        },
        
        email:  {
            type :DataTypes.STRING,
            allowNull :false,
        },
        contactNo:  {
            type :DataTypes.INTEGER,
            allowNull :false,
        },
        gender :{
            type: DataTypes.ENUM('Male','Female','Other'),
            allowNull :false,
        },

        preference:{
            type :DataTypes.ENUM('Academic', 'General'),
            allowNull :false,
        },
        country:{
            type :DataTypes.STRING,
            allowNull :false,
        },
        requiredScore:  {
            type :DataTypes.DECIMAL(5,2),
            allowNull :false,
        },
        status:{
            type:DataTypes.ENUM('Registered', 'Enrolled','Completed','Blocked'),
            allowNull :false,
        }
    });

    Student.associate = (models) => {
        Student.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
            onUpdate : 'CASCADE',
        });
        Student.belongsTo(models.Course, {
            foreignKey: "courseId",
            as: "course",
          });
        
    }

    return Student
}