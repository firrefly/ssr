'use-strict';
// Modules
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const FormatMessagesWebpackPlugin = require('format-messages-webpack-plugin');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Constants
const {
  APP_DIR,
  PATH_TO_PROJECT,
  PATH_TO_ASSETS,
  PATH_TO_PUBLIC,
  PATH_TO_BUILD,
  IS_DEVELOPMENT,
  PUBLIC_URL,
} = require('./constants');
// Aliases
const {
  ALIASES_OBJECT,
} = require('./aliases');

// Config
const mainConfig = {  
  resolve: {
    alias: ALIASES_OBJECT,
    extensions: ['.js', '.jsx', '.json', 'ts', 'tsx', '.mjs'],
    modules: [PATH_TO_PROJECT, 'node_modules'],
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
        ],
      },

      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },

      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/,
        include: /[/\\](fonts|img|)[/\\]/,
        use: [
          {
            loader: "url-loader",
            options: {
              fallback: "file-loader",
              limit: 100,
              name: "[name].[hash].[ext]",
              outputPath: "files",
              publicPath: (url, resourcePath, context) => IS_DEVELOPMENT ? `files/${url}` : `files/${url.replace(PUBLIC_URL, "")}`,
            },
          },
        ],
      },

      {
        test: /\.svg$/,
        include: /[/\\]svg[/\\]/,
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'url-loader',
            options: {
              jsx: true,
              fallback: 'file-loader',
              limit: 100000,
              name: '[name].[hash].[ext]',
              outputPath: 'files',
              publicPath: (url, resourcePath, context) => IS_DEVELOPMENT ? `files/${url}` : `files/${url.replace(PUBLIC_URL, '')}`,
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    // new FormatMessagesWebpackPlugin({ notifications: false }),
    new webpack.WatchIgnorePlugin([path.resolve(APP_DIR, 'node_modules')]),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = {
  mainConfig,
};
