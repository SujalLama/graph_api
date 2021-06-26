'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'authorId', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books', 'authorId')
  }
};
