'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ScheduleExams', {
      sId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          'Scheduled',
          'Faced',
          'Not Sat',
          'Canceled',
          'Marks Released'
        ),
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
    await queryInterface.dropTable('ScheduleExams');
  },
};
