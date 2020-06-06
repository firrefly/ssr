// Modules
import path from 'path';

const ROOT = process.cwd();

export const Consts = {
  PATH: {
    ROOT,
    TEMPLATE: path.resolve(ROOT, '../build/index.html'),
  },

  SERVER: {
    RUN: (host, port) => `Server start on the ${host}:${port}`,
    ERROR: (error, ctx) => `Server error: ${error}, ${ctx}`,
  },
};
