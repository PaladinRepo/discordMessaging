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
    return new Promise( async (resolve, reject) => {
      try{

        var User = global_wagner.get('User');
        unirest('POST', config.discord.api_host+config.discord.token_ep)
        .headers({'Content-Type': 'application/x-www-form-urlencoded'})
        .send('scope='+config.discord.oauth2_auth_scope)
        .send('grant_type=authorization_code')
        .send('code='+req.query.code)
        .send('redirect_uri='+config.app_route+'accept/')
        .send('client_id='+config.discord.client_id)
        .send('client_secret='+config.discord.client_secret)
        .send('state=123')
        .end(async (response) => {
          if(response.error){
            reject({message:response.error.message, data: response.body});
          } else {
            let user = await User.create(JSON.parse(response.raw_body));
            await Users.prototype["GetProfile"](user);
            resolve(response.raw_body);
          }
        });

      } catch(e) { reject(e); }
    });
  };

  Users.prototype["GetProfile"] = function(user) {
    return new Promise( async (resolve, reject) => {
      try{

        var User = global_wagner.get('User');
        let user = User.findOne(); // mocking
        resolve(user);

      } catch(e) { reject(e); }
    });
  };

  Users.prototype["index"] = function(req) {
    return new Promise( async (resolve, reject) => {
      try{

        var User = global_wagner.get('User');
        User.findAll({})
        .then(result => { resolve(result); })
        .catch(error=> { reject(error); });

      } catch(e) { reject(e); }
    });
  };

  return Users;

})();

module.exports = Users;
