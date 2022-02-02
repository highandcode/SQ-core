import minify from 'rollup-plugin-babel-minify';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
// import pkg from "./package.json";
import scss from 'rollup-plugin-scss';
import { writeFileSync, mkdirSync } from 'fs';

const PRODUCTION = process.env.PROD === 'true';
const year = new Date().getFullYear();

let exportConfig = [];
const pkg = {};

function buildCMSApp(appName, options = {}) {
  const strBanner = `/*!
  * ${pkg.name}:cms:${appName} v${pkg.version}
  * ${pkg.homepage}
  * Licence ${pkg.license}
  * Copyright ${pkg.startYear}-${year} ${pkg.author}
  */`;

  const appBasePath = `./cms/apps/${appName}`;
  const outputAppPath = `./cms/client/libs/${appName}`;
  // Configuration
  const external = options.external || [];
  const globals = {};
  const plugins = [
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    nodeResolve(),
    commonjs(),
    scss({
      output: true,

      // Filename to write all styles to
      output: `${appBasePath}/css/${appName}.css`,
      output: (styles, styleNodes) => {
        console.log('writing styles...');
        mkdirSync(`${outputAppPath}/css`, { recursive: true });
        writeFileSync(`${outputAppPath}/css/${appName}.css`, [strBanner, styles].join(''));
        console.log('done writing styles...');
      },
      failOnError: true
    })
  ];

  // If production add minfify plugin
  if (PRODUCTION) {
    plugins.push(minify());
  }

  const filePostFix = PRODUCTION ? '.min.js' : '.js';

  return {
    input: path.resolve(__dirname, options.entry || `${appBasePath}/src/index.js`),
    output: {
      file: path.resolve(__dirname, `${outputAppPath}/js/${appName}${filePostFix}`),
      format: 'umd',
      name: options.name || appName,
      globals,
      banner: strBanner
    },
    external,
    plugins
  };
}

exportConfig.push(buildCMSApp('core', { name: 'SQ' }));
exportConfig.push(buildCMSApp('basic', { external: ['SQ'] }));

export default exportConfig;
