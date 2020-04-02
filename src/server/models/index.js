var fs   = require('fs');
var path = require('path');
var _    = require('underscore');

module.exports = function(sequelize,wagner) {

    var models = {};
    var excludeFiles = ["index.js"];
    fs
    .readdirSync(__dirname)
    .filter(file => {
	  return (file.indexOf('.') !== 0) && (excludeFiles.indexOf(file) < 0);
    })
    .forEach(file => {
      var model = sequelize['import'](path.join(__dirname, file));
      models[model.name] = model;
    });

    Object.keys(models).forEach(modelName => {
      if (models[modelName].associate) {
        models[modelName].associate(models);
      }
    });

    _.each(models, (function(_this) {
        return function(value, key) {
          return wagner.factory(key, function() {
            return value;
          });
        };
    })(this));

    return models

};
