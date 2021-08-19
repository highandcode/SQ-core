const fs = require('fs-extra');
const path = require('path');
var file_system = require('fs');

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

function copyFolderRecursiveSync(source, target, ignore = ['node_modules', 'coverage', '.storybook', '.nyc_output', 'package-lock.json']) {
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
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

class WebDeployment {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        target: '',
        source: '',
        package: null
      },
      options
    );
    if (!this.options.package) {
      throw 'Package config missing';
    }
  }

  deploy() {
    copyFolderRecursiveSync(`${this.options.source}/${this.options.package.name}/apps`, `${this.options.target}`);
    copyFolderRecursiveSync(`${this.options.source}/${this.options.package.name}/content`, `${this.options.target}`);
    copyFolderRecursiveSync(`${this.options.source}/${this.options.package.name}/dam`, `${this.options.target}`);
    copyFolderRecursiveSync(`${this.options.source}/${this.options.package.name}/clientlibs`, `${this.options.target}`);
  }
}

module.exports = {
  WebDeployment
};
