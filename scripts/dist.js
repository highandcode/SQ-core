const fs = require('fs-extra');
const path = require('path');
var file_system = require('fs');
var archiver = require('archiver');
const paths = require('../config/paths');
var packageJson = require('../package.json');

function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target, ignore = ['node_modules', 'coverage', '.storybook', '.nyc_output', 'package-lock.json'], root = false) {
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  // Check if folder needs to be created or integrated
  var targetFolder = root ? target : path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        if (ignore.indexOf(path.basename(curSource)) === -1) {
          copyFileSync(curSource, targetFolder);
        }
      }
    });
  }
}

function copyContent() {
  fs.copyFileSync(paths.appPath + '/package.json', paths.dist + `/package.json`);
  var target = `${paths.dist}/cms`;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  target = `${paths.dist}/web`;
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  copyFolderRecursiveSync(`${paths.appPath}/cms/apps`, `${paths.dist}/cms`);
  copyFolderRecursiveSync(`${paths.appPath}/tests`, `${paths.dist}`);
  copyFolderRecursiveSync(`${paths.appPath}/cms/client`, `${paths.dist}/cms`);
  copyFolderRecursiveSync(`${paths.appPath}/cms/content`, `${paths.dist}/cms`);
  copyFolderRecursiveSync(`${paths.appPath}/web/styles`, `${paths.dist}/web`);
}
function cpNodeModules() {
  copyFolderRecursiveSync(`${paths.dist}`, `${paths.appPath}/../node_modules/sq-core`, undefined, true);
}
function cpSource() {
  copyFolderRecursiveSync(`${paths.appPath}`, `${paths.appPath}/../node_modules/sq-core`, undefined, true);
}

function zipBuild(filename) {
  var output = file_system.createWriteStream(filename);
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(paths.distBuild + `/${packageJson.name}`, false);

  archive.finalize();
}

copyContent();
// cpNodeModules();
// cpSource()
// zipBuild(`./dist/${packageJson.name}-${packageJson.version}.zip`);
