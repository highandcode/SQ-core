const fs = require('fs-extra');
const path = require('path');
// const ArgsReader = require('./args-reader');
const paths = require('../config/paths');
// var packageJson = require('../package.json');
// var args = new ArgsReader().get();

function copyFolderRecursiveSync(source, target = '.scss', preFix, ignore = ['node_modules', 'coverage', '.storybook', '.nyc_output', 'package-lock.json'], createFolder = true) {
  if (!fs.existsSync(source)) {
    return;
  }
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  var imports = [];
  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        imports.push(copyFolderRecursiveSync(curSource, target, preFix));
      } else {
        if (path.extname(curSource) === target && ignore.indexOf(path.basename(curSource)) === -1) {
          imports.push(`@import "../../${path.relative(paths.appSrc, curSource)}";`);
        }
      }
    });
  }
  return imports.join('\n');
}

var folders = ['components', 'containers', 'templates'];

var targetFolder = `${paths.appSrc}/styles/application`;

folders.forEach((folProcess) => {
  var output = copyFolderRecursiveSync(`${paths.appSrc}/${folProcess}`, '.scss', '../../');
  fs.writeFileSync(`${targetFolder}/${folProcess}.scss`, output);
});
