var paths = require('./config/paths');
// const packageJson = require('./package.json');
// const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    core: ['@babel/polyfill', `./cms/apps/core/src/index.js`],
  },
  mode: 'production',
  // devtool: 'source-map',
  output: {
    path: `${paths.cmsLibs}`,
    filename: `[name]/js/[name].js`,
    library: 'SQ',
    publicPath: '/client/libs/',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  externals: [],
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              // Add this option
              url: false,
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [paths.cmsApps],
              },
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10,
          name: `assets/static/media/[name].[hash:8].[ext]`,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name]/css/[name].css`,
      chunkFilename: `[id].css`,
    }),
  ],
};
