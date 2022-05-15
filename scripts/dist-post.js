const fs = require('fs-extra');
const path = require('path');
const paths = require('../config/paths');
var packageJson = require('../package.json');
const { ArgsReader } = require('./index');

var params = new ArgsReader().get();

function copyContent(trgt) {
  fs.copyFileSync(
    paths.dist + `/${packageJson.name}-${packageJson.version}.tgz`,
    paths.appPath + `/${trgt}/${packageJson.name}-${packageJson.version}.tgz`
  );
}
if (params.trgt) {
  copyContent(params.trgt);
}
