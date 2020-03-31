require('dotenv').config();
const express = require('express');
const path    = require('path');
const favicon = require('static-favicon');
const logger  = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const wagner       = require('wagner-core');

var app = express();
// Set PORT variable
const PORT = process.env.PORT || 3001;

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');
app.set('port', PORT);

// add sequelize ORM to wagner dependency manager
const sequelize = require('./server/utils/db')(wagner);
const dependencies = require('./server/utils/dependencies')(wagner);

// include the models, managers or any other utils here
require('./server/models')(sequelize, wagner);
require('./server/managers')(wagner);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// include the routes path here
require('./server/routes')(app,wagner);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err.message);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'Nodejs - Internal Error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error.message', {
        message: err.message,
        error: {},
        title: 'Nodejs - Internal Error'
    });
});


// Set the PORT and start listening
app.set('port', process.env.PORT || PORT);
app.listen(app.get('port'));
console.log('Running on http://localhost:' + PORT);

// export the app instance
module.exports = app
