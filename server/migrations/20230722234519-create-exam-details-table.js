'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ExamDetails', {
      examId: {
        type: Sequelize.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      examName: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      duration: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      examType: {
        type: Sequelize.ENUM(
          'Placement Test',
          'Mock Exam',
          'Final Exam',
          'In-class Test',
          'Mid Exam'
        ),
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
    await queryInterface.dropTable('ExamDetails');
  },
};
