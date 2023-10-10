'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,

        // references: {
        //   model: User,
        //   key: 'id'
        // }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,

        // references: {
        //   model: User,
        //   key: 'id'
        // }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};
