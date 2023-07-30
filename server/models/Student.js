const { DataTypes } = require("sequelize");



module.exports = (sequelize,DataTypes) => {
    const Student = sequelize.define ("Student", {
        stuId:  {
            type :DataTypes.STRING,
            allowNull :false,
            primaryKey: true,
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
        address :{
            type :DataTypes.STRING,
            allowNull :false,
        },
        nic:  {
            type :DataTypes.STRING,
            allowNull :false,
            unique: true,
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
            type :DataTypes.STRING,
            allowNull :false,
        },
        gender :{
            type: DataTypes.ENUM('Male','Female','Other'),
            allowNull :false,
        },
        profession :{
            type :DataTypes.STRING,
            allowNull :false,
        },

        preference:{
            type :DataTypes.ENUM('Academic', 'General'),
            allowNull :true,
        },
        country:{
            type :DataTypes.STRING,
            allowNull :true,
        },
        requiredScore:  {
            type :DataTypes.DECIMAL(5,2),
            allowNull :true,
        },
       
    });

    Student.associate = (models) => {
       
        Student.belongsTo(models.Course, {
            foreignKey: "courseId",
            as: "course",
          }); 
             
        }
    return Student
}