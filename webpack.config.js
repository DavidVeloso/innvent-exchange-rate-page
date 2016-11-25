var webpack = require('webpack');
var opts = {
  entry: './assets/main.js',
  output: {
    path: 'dist',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};

opts.output.publicPath = 'dist/';
module.exports = opts;