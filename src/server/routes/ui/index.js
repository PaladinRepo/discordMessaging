const fs = require('fs');
const path = require('path');
const async = require('async');
const config = require('config');
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

    app.get('/accept', async (req, res) => {
      try{
        var result = await wagner.get('Users').ExchangeToken(req);
        res.render('accept', {
            title: 'Discord Messaging - Exchange code done',
            data: result, error: null
        });
      } catch(e) {
        res.render('accept', {
            title: 'Discord Messaging - Exchange code error',
            data: e.data ? e.data : {}, error: e.message
        });
      }

    });

    app.get('*', function (req, res) {
      res.render('error', {
          title: 'Discord Messaging - Page Not Found',
          message: "Invalid URL"
      });
    });

};
