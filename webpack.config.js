var path = require('path');
var webpack = require('webpack');
var NODE_ENV = process.env.NODE_ENV;

var entries = ['webpack-hot-middleware/client',
  path.join(__dirname, 'client/main.js'),
];

if (NODE_ENV === 'production') {
  entries = [path.join(__dirname, 'client/main.js')];
}

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'compiled'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0'],
      },
    }],
  },
};
