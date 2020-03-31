const Promise   = require('bluebird');
const config    = require('config');
const _         = require('underscore');

Users = (function() {

  var global_wagner;

  function Users(wagner){
    global_wagner = wagner;
  }

  Users.prototype["index"] = function(req) {
    return new Promise( function(resolve, reject) {

      var User = global_wagner.get('User');
      User.findAll({})
      .then(result => { resolve(result); })
      .catch(error=> { reject(error); });

    });
  };

  return Users;

})();

module.exports = Users;
