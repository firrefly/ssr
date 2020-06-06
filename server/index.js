require('ignore-styles');

const babelRegister = require('@babel/register');

babelRegister({
  ignore: [/(node_module)/],
  plugins: [
    ['@babel/plugin-transform-runtime', { regenerator: true } ],
  ],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
});

require('./server');
