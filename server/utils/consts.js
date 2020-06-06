// Modules
import path from 'path';
import { isString } from 'lodash';
// Lib
import { getInitialConsts } from '../lib';

const { ROOT, IS_DEVELOPMENT, IS_PRODUCTION } = getInitialConsts();

export const Consts = {
  ENV: {
    IS_DEVELOPMENT,
    IS_PRODUCTION,
  },

  PATH: {
    ROOT,
    TEMPLATE_DEV: 'http://localhost:3002/index.html',
    TEMPLATE_PROD: path.resolve(ROOT, '../build/index.html'),
  },

  SERVER: {
    RUN: (host, port) => `Server start on the ${host}:${port}`,
    ERROR: (error, ctx) => `Server error: ${error}, ${ctx}`,
  },
};
