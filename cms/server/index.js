const PageBuilder = require('./builder/page-builder');
var express = require('express');
var fse = require('fse');
const yaml = require('js-yaml');
const _ = require('lodash');
const Response = require('../../server/src/Response');

class ContentServer {
  getFilePath(path) {
    const pathToSeach = [this.config.rootApp, this.config.rootPath];

    for (let i = 0; i < pathToSeach.length; i++) {
      let currentPath = pathToSeach[i];
      if (fse.existsSync(`${currentPath}${path}.yaml`)) {
        return `${currentPath}${path}.yaml`;
      } else if (fse.existsSync(`${currentPath}${path}/index.yaml`)) {
        return `${currentPath}${path}/index.yaml`;
      } else if (fse.existsSync(`${currentPath}${path}`)) {
        return `${currentPath}${path}`;
      }
      return path;
    }
  }

  constructor(options = {}, app) {
    this.config = Object.assign(
      {
        rootPath: __dirname.replace('server', ''),
        rootClientPath: __dirname.replace('server', '') + 'client',
        rootApp: '',
        mode: 'development',
        srcPath: __dirname.replace('server', ''),
        serverPath: '/content/*',
        clientServerPath: '/client/*',
        damAssets: '',
        middleware: function (req, res, next) {
          next();
        }
      },
      options
    );
    this.app = app;
    this.contentFolder = this.config.serverPath.substr(0, this.config.serverPath.lastIndexOf('/'));
    this.clientLibs = __dirname.replace('server', '') + 'client';
  }

  init() {
    this.app.get(this.config.serverPath, this.config.middleware, this.serveContent.bind(this));
    this.app.post(this.config.serverPath, this.config.middleware, this.serveJson.bind(this));
    this.app.use('/client', express.static(this.clientLibs));
    if (this.config.damAssets) {
      this.app.use('/dam', express.static(this.config.damAssets));
    }
  }

  mapVanity(config, options = {}) {
    Object.keys(config).forEach((key) => {
      if (!config[key].match(this.config.serverPath)) {
        this.app.use(`${config[key]}`, (req, res) => {
          this.getPageContent(options.defaultPage).then((response) => {
            res.status(response.status).send(response.data);
          });
        });
      }
    });
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

  getAllSiblings(path, isFile, url) {
    let folder;
    if (isFile) {
      folder = path.substr(0, path.lastIndexOf('/'));
      url = url.substr(0, url.lastIndexOf('/'));
    } else {
      folder = path;
    }
    const pages = [];
    if (fse.lstatSync(folder).isDirectory()) {
      fse.readdirSync(folder).forEach((file) => {
        if (!fse.lstatSync(`${folder}/${file}`).isDirectory() && file !== 'index.yaml') {
          let contents;
          try {
            let fileContents = fse.readFileSync(`${folder}/${file}`, 'utf8');
            contents = yaml.loadAll(fileContents);
          } catch (ex) {
            contents = [];
          }
          if (contents.length > 0) {
            pages.push({
              path: url + '/' + file.replace('.yaml', ''),
              ...contents[0]
            });
          }
        }
      });
    }
    // return pages;
    return {
      parentPath: url,
      pages: _.groupBy(pages, 'category')
    };
  }

  serveJson(req, res) {
    const data = this.getPageData(req.params['0']);
    res.status(200).send(
      new Response({
        pageData: data.pageData,
        siteMap: data.site.siteConfig,
        metaData: data.merged
      }).success()
    );
  }

  getPageContent(path) {
    return new Promise((resolve, reject) => {
      const data = this.getPageData(path);
      new PageBuilder(data)
        .build()
        .then((page) => {
          resolve({
            status: data.status,
            data: page.output
          });
        })
        .catch((ex) => {
          reject({
            status: 500,
            data: 'Internal Error',
            ex
          });
        });
    });
  }

  getErrorPage() {
    const config = this.config;
    let filePath = '';
    let contents;

    if (config.siteConfig.siteMap.errorRedirects[500]) {
      filePath = this.getFilePath(config.siteConfig.siteMap.errorRedirects[500]);
    } else {
      filePath = this.getFilePath('/content/pages/error.yaml');
    }
    if (!fse.existsSync(filePath)) {
      filePath = this.get404Page();
    }
    let fileContents = fse.readFileSync(`${filePath}`, 'utf8');
    try {
      contents = yaml.loadAll(fileContents);
    } catch (ex) {
      contents = [{}];
    }
    return contents[0];
  }

  get404Page() {
    const config = this.config;
    let filePath = '';
    if (config.siteConfig.siteMap.errorRedirects[404]) {
      filePath = this.getFilePath(config.siteConfig.siteMap.errorRedirects[404]);
    } else {
      filePath = this.getFilePath('/content/pages/404.yaml');
    }
    return filePath;
  }

  getPageData(path) {
    const config = this.config;
    let status = 200;
    const srcFile = path;
    const fullPath = `${this.contentFolder}/${srcFile}`;
    let siblingData = {};
    let filePath = `${config.contentPath}/${srcFile}.yaml`;
    let isFile = true;

    if (!fse.existsSync(filePath)) {
      filePath = `${config.contentPath}/${srcFile}/index.yaml`;
      isFile = false;
    }

    if (!fse.existsSync(filePath)) {
      filePath = this.get404Page();
      status = 404;
    } else {
      siblingData = this.getAllSiblings(`${config.contentPath}/${srcFile}`, isFile, fullPath);
    }

    let fileContents = fse.readFileSync(`${filePath}`, 'utf8');
    let currentNode = this.getPageNode(config.siteMap, filePath);
    if (!currentNode) {
      currentNode = config.siteConfig.siteMap;
    }
    let contents;
    try {
      contents = yaml.loadAll(fileContents);
    } catch (ex) {
      contents = [this.getErrorPage()];
    }

    const merged = {
      navigation: currentNode.children,
      pageConfig: {},
      envConfig: config.envConfig,
      parentPath: siblingData.parentPath || fullPath,
      siblingPages: siblingData.pages
    };
    if (contents.length === 1) {
      contents = contents[0];
    }
    const data = {
      mode: config.mode,
      status,
      path: fullPath,
      site: config,
      pageData: contents,
      currentNode,
      merged
    };
    return data;
  }

  serveContent(req, res) {
    this.getPageContent(req.params['0'])
      .then((response) => {
        res.status(response.status).send(response.data);
      })
      .catch((response) => {
        res.status(response.status).send(response.data);
      });
  }
}

module.exports = {
  ContentServer
};
