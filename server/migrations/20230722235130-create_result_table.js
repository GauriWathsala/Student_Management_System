'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Results', {
      resultId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Marks: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      noAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      examId: {
        type: Sequelize.STRING, // Assuming this is the foreign key for ExamDetails
        allowNull: false,
        references: {
          model: 'ExamDetails', // Replace 'ExamDetails' with the actual table name for ExamDetails
          key: 'examId', // Replace 'examId' with the actual primary key of ExamDetails table
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
    await queryInterface.dropTable('Results');
  },
};
