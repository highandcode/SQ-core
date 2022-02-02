var paths = require('./config/paths');
const packageJson = require('./package.json');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    server: `./server/index.js`,
    vanillajs: `./vanillajs/index.js`,
    cms: `./cms/index.js`,
    // web: `./web/index.js`,
    scripts: `./scripts/index.js`
  },
  target: 'node',
  mode: 'production',
  // devtool: 'source-map',
  output: {
    path: paths.dist,
    filename: `${packageJson.name}/[name].js`
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              data: ' @import "abstract/variables.scss";\n@import "mixins/index.scss";',
              includePaths: [paths.appSrc, paths.styles, paths.assets],
              sourceMap: false
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10,
          name: `${packageJson.name}/static/media/[name].[hash:8].[ext]`
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${packageJson.name}/[name].css`,
      chunkFilename: `[id].css`
    })
  ]
};
