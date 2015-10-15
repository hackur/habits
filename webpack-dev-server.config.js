var config = require('./config/devConfig.js');

module.exports = require('./make-webpack-config')({
  build: false,
  config: config
});
