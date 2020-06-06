'use-strict';
// Modules
const fs = require('fs');
const path = require('path');
// Constants
const { PATH_TO_PROJECT, PREFIX_PATH } = require('./constants');

const DEFAULT_ALIASES = {
  redux: 'redux/src',
  // 'react-dom': '@hot-loader/react-dom',
  [PREFIX_PATH]: path.join(PATH_TO_PROJECT),
};

const getDirectories = () =>
  fs
    .readdirSync(PATH_TO_PROJECT, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const reducer = (accumulator, currentValue) => {
  const key = `${PREFIX_PATH}${currentValue.toLowerCase()}`;
  const pathDirectory = path.join(PATH_TO_PROJECT, currentValue);

  accumulator[key] = pathDirectory;
  return accumulator;
};

const ALIASES_OBJECT = Object.assign(DEFAULT_ALIASES, getDirectories().reduce(reducer, {}));

module.exports = { ALIASES_OBJECT };
