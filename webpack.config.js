var paths = require('./config/paths');
// const packageJson = require('./package.json');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: [
      'regenerator-runtime/runtime',
      'core-js/stable',
      `./server/index.js`,
    ],
    vanillajs: [
      'regenerator-runtime/runtime',
      'core-js/stable',
      `./vanillajs/index.js`,
    ],
    cms: ['regenerator-runtime/runtime', 'core-js/stable', `./cms/index.js`],
    'scripts/index': [
      'regenerator-runtime/runtime',
      'core-js/stable',
      `./scripts/index.js`,
    ],
    'scripts/build': [
      'regenerator-runtime/runtime',
      'core-js/stable',
      `./scripts/build.js`,
    ],
  },
  target: 'node',
  mode: 'production',
  output: {
    path: `${paths.dist}`,
    filename: `[name].js`,
    libraryTarget: 'umd',
  },
  externals: [
    nodeExternals({
      allowlist: ['regenerator-runtime/runtime', 'core-js/stable'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(txt|html)$/i,
        use: 'raw-loader',
      },
    ],
  },
  plugins: [],
};
