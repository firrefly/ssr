// Modules
const path = require('path');

// Mode
const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
const { NODE_ENV } = process.env;
const IS_DEVELOPMENT = NODE_ENV === DEVELOPMENT;
const IS_PRODUCTION = NODE_ENV === PRODUCTION;

// Constants from path
const APP_DIR = process.cwd();
const ASSETS_FOLDER = 'assets';
const SOURCE_FOLDER = 'src';
const BUILD_FOLDER = 'build';
const PATH_TO_ASSETS = path.resolve(APP_DIR, ASSETS_FOLDER);
const PATH_TO_PROJECT = path.resolve(APP_DIR, SOURCE_FOLDER);
const PATH_TO_BUILD = path.resolve(APP_DIR, '..', BUILD_FOLDER);

module.exports = {
  ASSETS_FOLDER,
  APP_DIR,
  DEVELOPMENT,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  NODE_ENV,
  PATH_TO_ASSETS,
  PATH_TO_PROJECT,
  PATH_TO_BUILD,
  PRODUCTION,
  SOURCE_FOLDER,
};
