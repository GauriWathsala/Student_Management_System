'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teachers', {
      teacherId: {
        type: Sequelize.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nic: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isNICFormat(value) {
            const is10CharacterNIC =
              value.length === 10 && /[0-9]{9}[Vv]/.test(value);
            const is12CharacterNIC = value.length === 12 && /[0-9]{12}/.test(value);
            if (!is10CharacterNIC && !is12CharacterNIC) {
              throw new Error('NIC format is invalid. Please enter a valid NIC.');
            }
          },
        },
      },
      dob: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      qualifications: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
      userId: {
        type: Sequelize.STRING, 
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });

    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Teachers');
  },
};
