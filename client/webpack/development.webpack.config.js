'use-strict';
// Modules
const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
// Constants
const {
  DEVELOPMENT,
  APP_DIR,
  PATH_TO_PROJECT,
  PATH_TO_PUBLIC,
  PATH_TO_ASSETS,
  PATH_TO_ENV_DEVELOPMENT,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
} = require('./constants');
// Webpack configs import
const { mainConfig } = require('./main.webpack.config');
const devConstants = dotenv.config({ path: PATH_TO_ENV_DEVELOPMENT }).parsed;

// Config
const devConfig = {
  mode: DEVELOPMENT,
  devtool: 'eval-source-map',
  entry: {
    bundle: path.resolve(APP_DIR, 'index.js'),
  },

  output: {
    filename: 'js/[name].js',
    path: PATH_TO_PUBLIC,
    publicPath: '',
  },

  devServer: {
    contentBase: [PATH_TO_ASSETS, PATH_TO_PUBLIC],
    clientLogLevel: 'none',
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    host: devConstants.HOST,
    open: false,
    overlay: false,
    port: devConstants.PORT,
    quiet: true,
    stats: 'errors-only',
    watchContentBase: true,
    writeToDisk: false,
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${PATH_TO_PUBLIC}/**/*`],
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: false,
      filename: 'index.html',
      template: path.join(PATH_TO_ASSETS, '/html/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(devConstants.NODE_ENV || DEVELOPMENT),
        IS_DEVELOPMENT: JSON.stringify(IS_DEVELOPMENT),
        IS_PRODUCTION: JSON.stringify(IS_PRODUCTION),
      },
    }),
  ],
};

const config = merge(mainConfig, devConfig);
module.exports = config;
