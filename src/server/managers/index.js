module.exports = function(wagner) {

  wagner.factory('Users', function() {
    var Users;
    Users = require('./users');
    return new Users(wagner);
  });

};
