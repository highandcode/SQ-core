import minify from 'rollup-plugin-babel-minify';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import jsonPlugin from '@rollup/plugin-json';
import pkg from './package.json';
// import scss from 'rollup-plugin-scss';
import { writeFileSync, mkdirSync } from 'fs';

const PRODUCTION = 'true';
const year = new Date().getFullYear();

let exportConfig = [];
const pkg = {};

function buildLibrary(appName, options = {}) {
  const strBanner = `/*!
  * ${pkg.name}:cms:${appName} v${pkg.version}
  * ${pkg.homepage}
  * Licence ${pkg.license}
  * Copyright ${pkg.startYear}-${year} ${pkg.author}
  */`;

  const appBasePath = `./${appName}`;
  const outputAppPath = `./dist/`;
  // Configuration
  const external = options.external || [];
  const globals = {};
  const plugins = [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    nodeResolve(),
    commonjs({}),
    jsonPlugin()
    // scss({
    //   output: true,

    //   // Filename to write all styles to
    //   output: `${appBasePath}/css/${appName}.css`,
    //   output: (styles, styleNodes) => {
    //     console.log('writing styles...');
    //     mkdirSync(`${outputAppPath}/css`, { recursive: true });
    //     writeFileSync(`${outputAppPath}/css/${appName}.css`, [strBanner, styles].join(''));
    //     console.log('done writing styles...');
    //   },
    //   failOnError: true
    // })
  ];

  // If production add minfify plugin
  if (PRODUCTION) {
    plugins.push(minify());
  }

  const filePostFix = '.js';

  return {
    input: path.resolve(__dirname, options.entry || `${appBasePath}/index.js`),
    output: {
      file: path.resolve(__dirname, `${outputAppPath}/${appName}${filePostFix}`),
      format: 'cjs',
      name: options.name || appName,
      globals,
      banner: strBanner
    },
    external,
    plugins
  };
}

exportConfig.push(buildLibrary('server', { name: 'SQ' }));
exportConfig.push(buildLibrary('cms', { name: 'SQ' }));

export default exportConfig;
