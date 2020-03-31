const fs = require('fs');
const path = require('path');
const async = require('async');
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
          title: 'Discord Messaging - Home'
      });

    });

    app.get('*', function (req, res) {

      res.render('error', {
          title: 'Discord Messaging - Page Not Found',
          message: "Invalid URL"
      });

    });

};
