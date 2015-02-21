var config = require('./config/buildConfig.js');

module.exports = require('./make-webpack-config')({
  build: true,
  config: config
});
