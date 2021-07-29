const fs = require('fs');
const path = require('path');
const ArgsReader = require('./args-reader');
const packagesToSync = ['sq-core'];
const ignoreFolders = ['node_modules', 'coverage', '.git', '.nyc_output', '.DS_Store'];

const printHash = (num) => {
  let hash = '';
  for (let i = 0; i < num * 2; i++) {
    hash += ' ';
  }
  return hash;
};
const printDirectoryName = (path) => {
  return path.substr(path.lastIndexOf('/') + 1);
};
/**
 * Look ma, it's cp -R.
 * @param {string} src The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest, nested = 1) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    console.log(`${printHash(nested)}${printDirectoryName(src)}`);
    fs.readdirSync(src).forEach(function (childItemName) {
      if (ignoreFolders.indexOf(childItemName) === -1) {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName), nested + 1);
      }
    });
  } else {
    console.log(`${printHash(nested)}${printDirectoryName(src)}`);
    fs.copyFileSync(src, dest);
  }
};

const config = {
  'swishqube-finance-app': {
    type: 'project',
    path: 'sq-core'
  },
  '3pattiplay': {
    type: 'project',
    path: 'sq-core'
  },
  'swishqube-web': {
    type: 'project',
    path: 'sq-core'
  },
  'gamestheka': {
    type: 'project',
    path: 'sq-core'
  },
  'sq-core': {
    type: 'self',
    path: 'swishqube-core'
  }
};

const obj = new ArgsReader().get();
const rootDirPath = path.resolve().replace('/packages/sq-core', '');
const appName = rootDirPath.substr(rootDirPath.lastIndexOf('/') + 1);
const fromDirectory = rootDirPath + '/packages';
const targetDirectory = rootDirPath.replace(appName, config[config[appName].path].path) + (config[config[appName].path].type === 'project' ? '/packages' : '');
console.log(appName);
console.log(fromDirectory);
console.log(targetDirectory);
packagesToSync.forEach((packageName) => {
  const finalPack = config[config[appName].path].type === 'project' ? `/${packageName}` : '';
  copyRecursiveSync(`${fromDirectory}/${packageName}`, `${targetDirectory}${finalPack}`);
});
