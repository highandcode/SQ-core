const babelConfig = require('../babel.config');
// your app's webpack.config.js

const paths = require('../config/paths');
const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async (options) => ({
    ...options,
    ...babelConfig
  }),
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: require.resolve('sass-loader'),
          options: {
            data: ' @import "abstract/variables.scss";\n@import "mixins/index.scss";',
            includePaths: [paths.appSrc, paths.styles, paths.assets],
            sourceMap: true
          }
        }
      ],
      include: path.resolve(__dirname, '../')
    });
    return { ...config, module: { ...config.module } };
  }
};
