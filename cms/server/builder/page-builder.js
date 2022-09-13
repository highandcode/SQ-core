const fse = require('fs-extra');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const _ = require('lodash');

class PageBuilder {
  constructor({
    path = '',
    site = {},
    siteConfig,
    mode,
    pageData = {},
    merged = {},
    extraParams,
    currentNode,
  }, config = {}) {
    this.path = path;
    this.site = site;
    this.siteConfig = siteConfig;
    this.mode = mode;
    this.data = pageData;
    this.merged = merged;
    this.currentNode = currentNode;
    this.extraParams = extraParams;
    this.config = config;
    this.fse = fse;
  }

  getComponentPath(compName) {
    const pathToSeach = [this.config.rootApp, this.config.rootPath];
    for (let i = 0; i < pathToSeach.length; i++) {
      let currentPath = pathToSeach[i];
      if (this.fse.existsSync(`${currentPath}/${compName}.ejs`)) {
        return `${currentPath}/${compName}.ejs`;
      } else if (this.fse.existsSync(`${currentPath}/${compName}/index.ejs`)) {
        return `${currentPath}/${compName}/index.ejs`;
      } else if (
        this.fse.existsSync(`${currentPath}/${compName}/${compName}.ejs`)
      ) {
        return `${currentPath}${path}/${compName}.ejs`;
      }
    }
    return compName;
  }

  build() {
    console.log('building page ->' + this.data.title);
    console.log('building page:template->' + this.data.template);
    console.log('building page:layout->' + this.data.layout);
    let currentNode = this.currentNode;
    return new Promise((resolve) => {
      let finalPath;
      if (fse.existsSync(`${this.site.rootApp}/${this.data.template}.ejs`)) {
        finalPath = `${this.site.rootApp}/${this.data.template}.ejs`;
      } else if (
        fse.existsSync(`${this.site.srcPath}/${this.data.template}.ejs`)
      ) {
        finalPath = `${this.site.srcPath}/${this.data.template}.ejs`;
      } else {
        finalPath = `${this.site.srcPath}/apps/core/templates/page.ejs`;
      }
      console.log('template:' + finalPath);
      // render page
      ejsRenderFile(
        `${finalPath}`,
        Object.assign(
          {},
          {
            ...this.merged,
            ...this.extraParams,
            getComponentPath: this.getComponentPath.bind(this),
            analytics: this.siteConfig.analytics,
            siteMap: this.siteConfig.siteMap,
            currentPath: this.path,
            currentNode,
            _,
            mode: this.siteConfig.mode || this.mode,
          },
          { pageData: this.data }
        )
      )
        .then((pageContents) => {
          let finalPath;
          if (fse.existsSync(`${this.site.rootApp}/${this.data.layout}.ejs`)) {
            finalPath = `${this.site.rootApp}/${this.data.layout}.ejs`;
          } else if (
            fse.existsSync(`${this.site.srcPath}/${this.data.layout}.ejs`)
          ) {
            finalPath = `${this.site.srcPath}/${this.data.layout}.ejs`;
          } else {
            finalPath = `${this.site.srcPath}/apps/core/layouts/default.ejs`;
          }
          console.log('layout:' + finalPath);
          // render layout
          return ejsRenderFile(
            `${finalPath}`,
            Object.assign(
              {},
              {
                currentPath: this.path,
                ...this.extraParams,
                ...this.merged,
                getComponentPath: this.getComponentPath.bind(this),
                analytics: this.siteConfig.analytics,
                siteMap: this.siteConfig.siteMap,
                currentNode,
                mode: this.siteConfig.mode || this.mode,
                _,
                pageData: this.data,
              },
              { body: pageContents }
            )
          );
        })
        .then((layoutContent) => {
          resolve({
            output: layoutContent,
          });
        });
    });
  }
}

module.exports = PageBuilder;
