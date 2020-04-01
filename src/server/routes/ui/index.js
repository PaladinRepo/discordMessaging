const fs = require('fs');
const path = require('path');
const async = require('async');
const config = require('config');
const unirest = require('unirest');
const HTTPStatus = require('http-status');

module.exports = function (app, wagner) {

    function isAuthenticated(req, res, next) {
        if (req.session.user)
            return next();

        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        res.redirect('/');
    }

    app.get('/', function (req, res) {
      res.render('index', {
          title: 'Discord Messaging - Home',
          connect_url: `${config.discord.api_host}${config.discord.auth_ep}?client_id=${config.discord.client_id}&redirect_uri=${config.app_route}accept%2F&response_type=code&scope=${config.discord.oauth2_auth_scope}`,
      });
    });

    app.get('/accept', function (req, res) {

      var req = unirest('POST', config.discord.api_host+config.discord.token_ep)
        .headers({'Content-Type': 'application/x-www-form-urlencoded'})
        .send('scope='+config.discord.oauth2_auth_scope)
        .send('grant_type=authorization_code')
        .send('code='+req.query.code)
        .send('redirect_uri='+config.app_route+'accept/')
        .send('client_id='+config.discord.client_id)
        .send('client_secret='+config.discord.client_secret)
        .send('state=123')
        .end(function (response) {
          res.render('accept', {
              title: 'Discord Messaging - Exchange code',
              data: response.raw_body, error: response.error ? response.error.message : ""
          });
        });

    });

    app.get('*', function (req, res) {
      res.render('error', {
          title: 'Discord Messaging - Page Not Found',
          message: "Invalid URL"
      });
    });

};
