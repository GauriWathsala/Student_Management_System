'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourseBooks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Courses', // Assuming the table name for Courses model is 'Courses'
          key: 'courseId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      bookId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Books', // Assuming the table name for Book model is 'Books'
          key: 'bookId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('CourseBooks');
  },
};
