const merge = require('webpack-merge');

const ENV = process.env.NODE_ENV;

const common = require('./webpack/webpack.config.common.js');
const development = require('./webpack/webpack.config.development.js');
const production = require('./webpack/webpack.config.production.js');

if (ENV === 'production') {
  module.exports = merge(common, production);
} else if (ENV === 'development') {
  module.exports = merge(common, development);
} else {
  module.exports = common;
}
