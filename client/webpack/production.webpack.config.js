'use-strict';
// Modules
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge');
// Constants
const {
  PATH_TO_ASSETS,
  PATH_TO_BUILD,
  PATH_TO_ENV_PRODUCTION,
  PATH_TO_PROJECT,
  NODE_ENV,
  PRODUCTION,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  APP_DIR,
} = require('./constants');
// Webpack configs import
const { mainConfig } = require('./main.webpack.config');
const prodConstants = dotenv.config({ path: PATH_TO_ENV_PRODUCTION }).parsed;

const prodConfig = {
  mode: PRODUCTION,
  stats: 'errors-warnings',
  devtool: false,

  entry: {
    bundle: path.resolve(APP_DIR, 'index.js'),
  },

  output: {
    filename: 'js/[name].js',
    path: PATH_TO_BUILD,
    publicPath: '/',
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${PATH_TO_BUILD}/**/*`],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: true,
    }),

    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      inject: true,
      filename: 'index.html',
      template: path.join(PATH_TO_ASSETS, 'html/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new HtmlWebpackHarddiskPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV || prodConstants.NODE_ENV || PRODUCTION),
        IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
        IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
      },
    }),
  ],
};

const config = merge(mainConfig, prodConfig);
module.exports = config;
