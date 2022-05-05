var paths = require('./config/paths');
// const packageJson = require('./package.json');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: ['@babel/polyfill', `./server/index.js`],
    vanillajs: ['@babel/polyfill', `./vanillajs/index.js`],
    cms: ['@babel/polyfill', `./cms/index.js`],
    'scripts/index': ['@babel/polyfill', `./scripts/index.js`],
    'scripts/build': ['@babel/polyfill', `./scripts/build.js`]
  },
  target: 'node',
  mode: 'production',
  output: {
    path: `${paths.dist}`,
    filename: `[name].js`,
    libraryTarget: 'umd'
  },
  externals: [nodeExternals({
    allowlist:[
      '@babel/polyfill'
    ]
  })],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(txt|html)$/i,
        use: 'raw-loader'
      }
    ]
  },
  plugins: []
};
