const { DataTypes } = require("sequelize");

module.exports = (Sequelize,DataTypes) => {
const Admin = Sequelize.define ("Admin", {
adminId:  {
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
email:  {
    type :DataTypes.STRING,
    allowNull :false,
},
address:  {
    type :DataTypes.STRING,
    allowNull :false,
},
nic:{
    type:DataTypes.STRING,
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

gender :{
    type : DataTypes.ENUM('Male', 'Female','Other'),
    allowNull :false, 
},
qualifications :{
    type : DataTypes.TEXT,
    allowNull :true,
},
contact :{
    type : DataTypes.STRING,
    allowNull : false
}

});

Admin.associate = (models) => {

Admin.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    });
    Admin.belongsTo(models.Staff, {
    foreignKey: 'userId',
    as: 'staff',
    onDelete: 'CASCADE',
    onUpdate : 'CASCADE',
    });

};



return Admin
}