const fs = require('fs-extra');
const path = require('path');
const { ArgsReader } = require('qubejs-core/scripts');
const paths = require('../config/paths');
var packageJson = require('../package.json');
var args = new ArgsReader().get();

function copyFolderRecursiveSync(source, target = '.scss', targetFolder, ignore = ['node_modules', 'coverage', '.storybook', '.nyc_output', 'package-lock.json'], createFolder = true) {
  if (!fs.existsSync(source)) {
    return;
  }
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, target, targetFolder);
      } else {
        if (path.extname(curSource) === target && ignore.indexOf(path.basename(curSource)) === -1) {
          const targetPath = path.relative(paths.appSrc, curSource);
          copyFileSync(curSource, `${targetFolder}/${targetPath}`);
          // `@import "../../${path.relative(paths.appSrc, curSource)}";`;
        }
      }
    });
  }
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function copyFileSync(source, target) {
  var targetFile = target;
  ensureDirectoryExistence(target);
  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

var folders = ['components', 'containers', 'templates'];

var targetFolder = `${paths.dist}/web`;

folders.forEach((folProcess) => {
  copyFolderRecursiveSync(`${paths.appSrc}/${folProcess}`, '.scss', targetFolder);
});
