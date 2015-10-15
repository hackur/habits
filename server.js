'use strict';

module.exports = function(options) {
  options = options || {};
  var devConfig = require('./config/devConfig.js');
  var buildConfig = require('./config/buildConfig.js');
  var express = require('express');
  var path = require('path');
  var fs = require('fs');
  var ncp = require('ncp').ncp;
  var webpack = require('webpack');
  var webpackConfig = require('./make-webpack-config')({
    config: options.build ? buildConfig : devConfig,
    build: options.build
  });
  var app = express();
  var compiler = webpack(webpackConfig);

  var html = fs.readFileSync(path.resolve(__dirname, './app/simple.html'), 'utf-8');

  function renderApplication(path, scriptUrl, styleUrl, commonsUrl, callback) {
    callback(null, html.replace('SCRIPT_URL', scriptUrl).replace('STYLE_URL', styleUrl));
  }

  var stats = require('./build/stats.json');
  var publicPath = stats.publicPath;
  var SCRIPT_URL = publicPath + [].concat(stats.assetsByChunkName.main)[0];

  var STYLE_URL = options.build ? publicPath + [].concat(stats.assetsByChunkName.main)[1] : '';
  var COMMONS_URL = '';

  if (options.build) {
    fs.readdirSync(path.resolve(__dirname, './build/public')).forEach(function(filename) {
      if (stats.assetsByChunkName.main.indexOf(filename) > -1) {
        return;
      }
      fs.unlink(path.resolve(__dirname, './build/public') + '/' + filename, function(err) {
        if (err) { throw err; }
        console.log('Deleted ' + filename);
      });
    });

    renderApplication('', SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
      fs.writeFile(path.resolve(__dirname, './build/index.html'), html, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Built index');
          fs.unlink(path.resolve(__dirname, './build/stats.json'), function (err) {
            if (err) { throw err; }
            console.log('Deleted stats.json');
          });

          ncp(path.resolve(__dirname, './public/'), path.resolve(__dirname, './build/'), function (err) {
            if (err) {
              return console.error(err);
            }
            console.log('Copied public folder to build');
          });
        }
      });
    });

  } else {
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use('/', express.static(path.join(__dirname, 'public'), {
    }));

    app.get('/*', function(req, res) {
      renderApplication(req.path, SCRIPT_URL, STYLE_URL, COMMONS_URL, function(err, html) {
        res.contentType = 'text/html; charset=utf8';
        res.end(html);
      });
    });

    var port = +(process.env.PORT || options.defaultPort || 8080);
    app.listen(port, function() {
      console.log('Server listening on port ' + port);
    });

  }
};
