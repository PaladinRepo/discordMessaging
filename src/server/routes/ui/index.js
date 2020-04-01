const fs = require('fs');
const path = require('path');
const async = require('async');
const config = require('config');
const request = require('request');
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

      var options = {
        'method': 'POST',
        'url': config.discord.api_host+config.discord.token_ep,
        'headers': {
          'Content-Type': 'application/x-www-form-urlencoded'
        }, form: {
          'scope': config.discord.oauth2_auth_scope,
          'grant_type': 'authorization_code',
          'code': req.query.code,
          'redirect_uri': config.app_route+'accept/',
          'client_id': config.discord.client_id,
          'client_secret': config.discord.client_secret,
          'state': '123'
        }
      };

      request(options, function (error, response) {
        if (error) throw new Error(error);
        res.render('accept', {
            title: 'Discord Messaging - Accept code',
            error: error ? error.message : "", data: response ? response.body : {}
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
