'use strict';
/*
{
  "access_token": "huSqlZj7YLMZpbuf0fCo5hiWgF4gbM",
  "expires_in": 604800,
  "refresh_token": "YpMne4xBkBr2r3kCy40m48kFerc5Fn",
  "scope": "identify email messages.read",
  "token_type": "Bearer"
}
*/
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
        email: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        access_token: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        refresh_token: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        expires_in: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        scope: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
        token_type: {
          type: Sequelize.STRING(255),
          unique: true,
          allowNull: true
        },
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
