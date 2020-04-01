'use strict';

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
var User = sequelize.define("User",
  {
    id: {
      type: Sequelize.INTEGER(20),
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
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
  }, {
    tableName: 'discord_users',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    classMethods: {}
  })

  User.associate = function (models) { }

  return User;

}
