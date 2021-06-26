'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', { 
      id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      token: Sequelize.STRING,
      genre: Sequelize.STRING,
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }
    },
      {timestamps: true}
      );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('books');
  }
};
