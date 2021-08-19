const fse = require('fs-extra');
const { promisify } = require('util');
const ejsRenderFile = promisify(require('ejs').renderFile);
const _ = require('lodash');

class PageBuilder {
  constructor({ path = '', site = {}, siteConfig, mode,  pageData = {}, merged = {}, currentNode }) {
    this.path = path;
    this.site = site;
    this.siteConfig = siteConfig;
    this.mode = mode;
    this.data = pageData;
    this.merged = merged;
    this.currentNode = currentNode;
  }

  getPageNode(node, path) {
    let foundNode;
    if (node && node.children) {
      for (let i = 0; i < node.children.length; i++) {
        let childNode = node.children[i];
        if (childNode.children && childNode.children.length > 0) {
          foundNode = this.getPageNode(childNode, path);
          if (foundNode) {
            if (!foundNode.children) {
              foundNode = childNode;
            }
            break;
          }
        }
        // console.log(childNode.href + "==" + path);
        if (childNode.href === path) {
          // console.log("matched =");
          // console.log(childNode);
          foundNode = childNode;
          break;
        } else if (childNode.href.indexOf(path) > -1 || path.indexOf(childNode.href) > -1) {
          // console.log("matched index");
          foundNode = node;
        }
      }
    }
    // console.log("returning node" + foundNode);
    return foundNode;
  }

  build() {
    console.log('building page ->' + this.data.title);
    console.log('building page:destPath->' + this.data.destPath);
    // }
    console.log('building page:template->' + this.data.template);
    console.log('building page:layout->' + this.data.layout);
    let currentNode = this.currentNode;
    return new Promise((resolve) => {
      let finalPath;
      if (fse.existsSync(`${this.site.rootApp}/${this.data.template}.ejs`)) {
        finalPath = `${this.site.rootApp}/${this.data.template}.ejs`;
      } else if (fse.existsSync(`${this.site.srcPath}/${this.data.template}.ejs`)) {
        finalPath = `${this.site.srcPath}/${this.data.template}.ejs`;
      } else {
        finalPath = `${this.site.srcPath}/page.ejs`;
      }
      console.log('template:' + finalPath);
      // render page
      ejsRenderFile(
        `${finalPath}`,
        Object.assign(
          {},
          {
            ...this.merged,
            analytics: this.siteConfig.analytics,
            siteMap: this.siteConfig.siteMap,
            currentPath: this.path,
            currentNode,
            _,
            mode: this.siteConfig.mode || this.mode
          },
          { pageData: this.data }
        )
      )
        .then((pageContents) => {
          let finalPath;
          if (fse.existsSync(`${this.site.rootApp}/${this.data.layout}.ejs`)) {
            finalPath = `${this.site.rootApp}/${this.data.layout}.ejs`;
          } else if (fse.existsSync(`${this.site.srcPath}/${this.data.layout}.ejs`)) {
            finalPath = `${this.site.srcPath}/${this.data.layout}.ejs`;
          } else {
            finalPath = `${this.site.srcPath}apps/core/layouts/default.ejs`;
          }
          console.log('layout:' + finalPath);
          // render layout
          return ejsRenderFile(
            `${finalPath}`,
            Object.assign(
              {},
              {
                currentPath: this.path,
                ...this.merged,
                analytics: this.siteConfig.analytics,
                siteMap: this.siteConfig.siteMap,
                currentNode,
                mode: this.siteConfig.mode || this.mode,
                _
              },
              { body: pageContents }
            )
          );
        })
        .then((layoutContent) => {
          resolve({
            output: layoutContent
          });
        });
    });
  }
}

module.exports = PageBuilder;
