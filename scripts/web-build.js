let FS = require('fs');
const chalk = require('react-dev-utils/chalk');
const BaseBuild = require('./base-build');

class WebBuildProcess extends BaseBuild {
  constructor({ appConfig = {}, ...config } = {}) {
    super(config);
    this.config = Object.assign(
      {
        urlAppConfig: true,
        host: '',
        indexHtml: '',
        scripts: ''
      },
      config
    );
    this.appConfig = appConfig;
   
    this.tags = {
      findLink: '<link',
      findScript: '<script',
      
      metaTags: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,

      scriptToInclude: `
        ${this.getAppConfig()}
       ${this.config.scripts}
      `
    };
  }

  getAppConfig() {
    if (this.config.inlineAppConfig) {
      return `<script> window.APP_CONFIG = ${JSON.stringify(this.appConfig)}; </script>`;
    } else if (this.config.urlAppConfig) {
      return `<script src="/env/app-config?_cb=${this.config.version}" ></script>`
    }
    return '';
  }

  insertContent(fullContent, beforeWhat, newContent) {
    // get the position before which newContent has to be added
    const position = fullContent.indexOf(beforeWhat);

    // since splice can be used on arrays only
    let fullContentCopy = fullContent.split('');
    fullContentCopy.splice(position, 0, newContent);

    return fullContentCopy.join('');
  }

  processHtml() {
    console.log(chalk.cyan('> processing html'));
    let data = FS.readFileSync(this.config.indexHtml, 'utf8');
    console.log(chalk.cyan('> removing local configuration'));
    data = this.removeContent(data, this.localTags.start, this.localTags.end);
    data = this.removeContent(data, this.localVars.start, this.localVars.end);
    console.log(chalk.cyan('> inserting meta'));
    let afterAddingMeta = this.insertContent(data, this.tags.findLink, this.tags.metaTags);
    console.log(chalk.cyan('> inserting scripts'));
    let afterAddingScript = this.insertContent(afterAddingMeta, this.tags.findScript, this.tags.scriptToInclude);

    return new Promise((resolve, reject) => {
      FS.writeFile(this.config.indexHtml, afterAddingScript, 'utf8', (err) => {
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

module.exports = WebBuildProcess;
