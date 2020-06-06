// Modules
import { isString } from 'lodash';

const ROOT = process.cwd();
const NODE_ENV_LIST = ['development', 'production'];
const { NODE_ENV } = process.env;

export const getInitialConsts = () => {
  const VALID_NODE = isString(NODE_ENV) && NODE_ENV_LIST.includes(NODE_ENV) 
    ? NODE_ENV : NODE_ENV_LIST[0];
  const IS_DEVELOPMENT = VALID_NODE === NODE_ENV_LIST[0];
  const IS_PRODUCTION = !IS_DEVELOPMENT;

  return ({
    ROOT,
    NODE_ENV,
    DEVELOPMENT: NODE_ENV_LIST[0],
    PRODUCTION: NODE_ENV_LIST[1],
    IS_DEVELOPMENT,
    IS_PRODUCTION,
  });
};
