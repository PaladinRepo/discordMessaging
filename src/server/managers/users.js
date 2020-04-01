const Promise = require('bluebird');
const config  = require('config');
const unirest = require('unirest');
const _       = require('underscore');

Users = (function() {

  var global_wagner;

  function Users(wagner){
    global_wagner = wagner;
  }

  Users.prototype["ExchangeToken"] = function(req) {
    return new Promise( function(resolve, reject) {

      let mockRes = {
        "access_token": "huSqlZj7YLMZpbuf0fCo5hiWgF4gbM",
        "expires_in": 604800,
        "refresh_token": "YpMne4xBkBr2r3kCy40m48kFerc5Fn",
        "scope": "identify email messages.read",
        "token_type": "Bearer"
      }

      var User = global_wagner.get('User');
      resolve(mockRes);

      /*
      unirest('POST', config.discord.api_host+config.discord.token_ep)
      .headers({'Content-Type': 'application/x-www-form-urlencoded'})
      .send('scope='+config.discord.oauth2_auth_scope)
      .send('grant_type=authorization_code')
      .send('code='+req.query.code)
      .send('redirect_uri='+config.app_route+'accept/')
      .send('client_id='+config.discord.client_id)
      .send('client_secret='+config.discord.client_secret)
      .send('state=123')
      .end(function (response) {
        response.error ? reject({message:response.error.message, data: response.body}) : resolve(response.raw_body);
      }); */

    });
  };

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
