'use strict';

const quiz = require("../models/quiz");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Quizzes',
      'weight',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Quizzes', 'weight')
  }
};
