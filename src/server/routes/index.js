module.exports = function(app, wagner) {
    require('./v1/users')(app, wagner);
  	require('./ui/index')(app, wagner);
};
