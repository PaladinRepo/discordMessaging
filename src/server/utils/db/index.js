const Sequelize = require('sequelize');
const config    = require('config');
const dbconfig  = config.get('db');

module.exports  = function(wagner) {
    return new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig.options);
}
