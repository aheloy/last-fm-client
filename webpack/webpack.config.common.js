const webpack = require('webpack'); // eslint-disable-line no-unused-vars
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  context: path.join(__dirname, '../src'),

  entry: {
    app: ['./index.js'],
  },

  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name]-[hash].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /(\.css$)/,
        loaders:
          [
            'style-loader',
            'css-loader',
            'postcss-loader'
          ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader:
          'url-loader?limit=100000'
      }
    ]
  },

  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
    alias: {
      src: path.resolve(__dirname, '../src/'),
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    })
  ],
};
