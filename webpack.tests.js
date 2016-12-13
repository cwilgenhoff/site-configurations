var path = require('path');

module.exports = {
  entry: [
    './tests/beforeRun.js',
    './tests/indexTest.js'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'tests-bundle.js',
    publicPath: '/',
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      }
    ],
  },

  plugins: [],
};
