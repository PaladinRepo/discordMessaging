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
