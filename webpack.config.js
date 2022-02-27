var paths = require('./config/paths');
const packageJson = require('./package.json');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    server: `./server/index.js`,
    vanillajs: `./vanillajs/index.js`,
    cms: `./cms/index.js`,
    scripts: `./scripts/index.js`
  },
  target: 'node',
  mode: 'production',
  output: {
    path: `${paths.dist}`,
    filename: `[name].js`
  },
  externals: [nodeExternals({
    allowlist: [/^babel/,/^core-js/,/^regenerator-runtime/]
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
      }
    ]
  },
  plugins: [
    
  ]
};
