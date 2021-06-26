'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('authors', { 
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
      age: Sequelize.INTEGER,
    },
      {timestamps: true}
      );
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('authors');
  }
};
