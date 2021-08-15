let FS = require('fs');
const BaseBuild = require('./base-build');

class IosBuildProcess extends BaseBuild {
  constructor({ appConfig, ...config } = {}) {
    super(appConfig, {
      ...config,
      rootClass: 'app-android',
      target: 'android'
    });
  }

  processHtml() {
    let scripToPRocess = this.processDefault();

    return new Promise((resolve, reject) => {
      FS.writeFile(this.config.indexHtml, scripToPRocess, 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('done');
        }
      });
    });
  }

  process() {
    return new Promise(async (resolve) => {
      await this.processHtml();
      resolve('done');
    });
  }
}

module.exports = IosBuildProcess;
