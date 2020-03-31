'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.createTable(
      'discord_users',
      {
        id: {
          type: Sequelize.INTEGER(20),
          unique: true,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unsigned: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        username: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        token: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        }
      },
      {
        engine: 'InnoDB',    // default: 'InnoDB'
        schema: '',    // default: public, PostgreSQL only.
        comment: 'users table', // comment for table
        collate: 'utf8_general_ci' // collation, MYSQL only
      }
    )
  },

  down: (queryInterface, Sequelize) => { }
};
