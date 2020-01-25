const path = require('path');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './static/scripts/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'static/scripts'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
};
