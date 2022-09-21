const babelConfig = require('../babel.config'); // your app's webpack.config.js

const paths = require('../config/paths');

const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  babel: async (options) => ({ ...options, ...babelConfig }),
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: require.resolve('sass-loader'),
          options: {
            sassOptions: {
              includePaths: [paths.appSrc, paths.styles, paths.assets],
            },
            additionalData: (content, loaderContext) => {
              if (loaderContext.resourcePath.endsWith('abstract\\_variables.scss') || loaderContext.resourcePath.endsWith('abstract/_variables.scss')) {
                return content;
              }
              return `
            @import "abstract/_variables.scss";
            @import "mixins/index.scss";
          ${content}
        `;
            },
            sourceMap: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    return { ...config, module: { ...config.module } };
  },
  core: {
    builder: 'webpack5',
  },
};
