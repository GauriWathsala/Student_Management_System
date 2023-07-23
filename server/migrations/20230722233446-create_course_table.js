'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      courseId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      courseName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      courseFee: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      courseDuration: {
        type: Sequelize.INTEGER,
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
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
  },
};
