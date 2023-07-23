'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CourseModules', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Courses', 
          key: 'courseId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      moduleId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Modules', 
          key: 'moduleId',
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
    await queryInterface.dropTable('CourseModules');
  },
};
