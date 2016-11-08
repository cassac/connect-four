var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js"
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": { 
           NODE_ENV: JSON.stringify("production") 
         }
      })
    ]
};