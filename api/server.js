import express from 'express';
import serveStatic from 'serve-static';
const webpack = require('webpack');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./../../webpack.config.js');

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      hot: true,
    },
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

app.use(serveStatic(path.join(__dirname, './../')));
app.listen(process.env.PORT || 3000);
