var express = require('express');
var our_fse = require('fse');
const yaml = require('js-yaml');
const _ = require('lodash');
const utils = require('../../server/src/utils');
const PageBuilder = require('./builder/page-builder');
const Response = require('../../server/src/Response');
const pkgName = require('../../package.json');

class ContentServer {
  constructor(
    {
      fse,
      dirname = `${process.cwd()}/node_modules/${pkgName.name}/cms/`,
      ...options
    } = {},
    app
  ) {
    const cmsRootServer = dirname;
    console.log(`root:${cmsRootServer}`);
    console.log(`root:client::${cmsRootServer}client`);
    this.config = Object.assign(
      {
        rootPath: cmsRootServer,
        rootClientPath: cmsRootServer + 'client',
        rootApp: '',
        appConfig: {},
        mode: 'development',
        srcPath: cmsRootServer,
        serverPath: '/content/*',
        clientServerPath: '/client/*',
        damAssets: '',
        userData: () => ({}),
        middleware: function (req, res, next) {
          next();
        },
      },
      options
    );
    this.app = app;
    this.fse = fse || our_fse;
    this.contentFolder = this.config.serverPath.substr(
      0,
      this.config.serverPath.lastIndexOf('/')
    );
    this.clientLibs = cmsRootServer + 'client';
    this.allSiteMaps = {};
    this.searchSiteMaps();
  }

  getFilePath(path) {
    const pathToSeach = [this.config.rootApp, this.config.rootPath];

    for (let i = 0; i < pathToSeach.length; i++) {
      let currentPath = pathToSeach[i];
      // console.log('>>>' + currentPath + ':' + path);
      if (this.fse.existsSync(`${currentPath}${path}.yaml`)) {
        return `${currentPath}${path}.yaml`;
      } else if (this.fse.existsSync(`${currentPath}${path}/index.yaml`)) {
        return `${currentPath}${path}/index.yaml`;
      } else if (this.fse.existsSync(`${currentPath}${path}`)) {
        return `${currentPath}${path}`;
      }
    }
    return path;
  }

  searchSiteMaps() {
    console.log('searching site maps in:' + this.config.contentPath);
    const siteMaps = {};
    this.fse.readdir(this.config.contentPath, (err, list) => {
      if (err) throw err;
      for (var i = 0; i < list.length; i++) {
        // console.log(`${this.config.contentPath}/${list[i]}/sitemap.yaml`);
        if (
          this.fse.existsSync(
            `${this.config.contentPath}/${list[i]}/sitemap.yaml`
          )
        ) {
          let contents;
          try {
            let fileContents = this.fse.readFileSync(
              `${this.config.contentPath}/${list[i]}/sitemap.yaml`,
              'utf8'
            );
            contents = yaml.loadAll(fileContents);
          } catch (ex) {
            contents = '';
          }
          if (contents) {
            siteMaps[list[i]] = contents[0];
          }
        }
        // if (path.extname(list[i]) === fileType) {
        //   console.log(list[i]); //print the file
        //   files.push(list[i]); //store the file name into the array files
        // }
      }
      this.allSiteMaps = siteMaps;
      // console.log(this.allSiteMaps);
    });
  }

  init() {
    this.app.get(
      this.config.serverPath,
      this.config.middleware,
      this.serveContent.bind(this)
    );
    this.app.post(
      this.config.serverPath,
      this.config.middleware,
      this.serveJson.bind(this)
    );
    this.app.use('/client', express.static(this.clientLibs));
    if (this.config.damAssets) {
      this.app.use('/dam', express.static(this.config.damAssets));
    }
    if (this.config.clientLibs) {
      this.app.use('/clientlibs', express.static(this.config.clientLibs));
    }
  }

  mapVanity(config, options = {}) {
    Object.keys(config).forEach((key) => {
      var newKey;
      if (typeof config[key] === 'object') {
        newKey = config[key].target;
      } else {
        newKey = config[key];
      }
      if (!newKey.match(this.config.serverPath)) {
        this.app.use(`${newKey}`, (req, res) => {
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
        if (
          !childNode.always &&
          childNode.children &&
          childNode.children.length > 0
        ) {
          foundNode = this.getPageNode(childNode, path);
          if (foundNode) {
            if (!foundNode.children) {
              foundNode = childNode;
            }
            break;
          }
        }
        // console.log(childNode.href + "==" + path);
        if (!childNode.always && childNode.href === path) {
          // console.log("matched =");
          // console.log(childNode);
          foundNode = childNode;
          break;
        } else if (
          (!childNode.always && childNode.href.indexOf(path) > -1) ||
          path.indexOf(childNode.href) > -1
        ) {
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
    if (this.fse.lstatSync(folder).isDirectory()) {
      this.fse.readdirSync(folder).forEach((file) => {
        if (
          !this.fse.lstatSync(`${folder}/${file}`).isDirectory() &&
          file !== 'index.yaml'
        ) {
          let contents;
          try {
            let fileContents = this.fse.readFileSync(
              `${folder}/${file}`,
              'utf8'
            );
            contents = yaml.loadAll(fileContents);
          } catch (ex) {
            contents = [];
          }
          if (contents.length > 0) {
            pages.push({
              path: url + '/' + file.replace('.yaml', ''),
              ...contents[0],
            });
          }
        }
      });
    }
    // return pages;
    return {
      parentPath: url,
      pages: _.groupBy(pages, 'category'),
    };
  }

  serveJson(req, res) {
    this.getPageDataForUi(req.params['0']).then((data) => {
      res.status(200).send(new Response(data).success());
    });
    // setTimeout(() => {
    // }, 5000);
  }

  getPageDataForUi(path) {
    const data = this.getPageData(path);
    return Promise.resolve({
      pageData: data.pageData,
      siteMap: data.siteConfig,
      metaData: data.merged,
    });
  }

  getPageContent(path) {
    return new Promise((resolve, reject) => {
      const data = this.getPageData(path);
      new PageBuilder(data, this.config)
        .build()
        .then((page) => {
          resolve({
            status: data.status,
            data: page.output,
          });
        })
        .catch((ex) => {
          reject({
            status: 500,
            data: 'Internal Error',
            ex,
          });
        });
    });
  }

  getErrorPage(siteConfig, path) {
    const config = this.config;
    siteConfig = siteConfig || config.siteConfig;
    const siteMap = siteConfig.siteMap;
    let filePath = '';
    let contents;
    filePath = this.getIfMatchPagesOnRoute(siteConfig, path, 500);
    console.log(filePath);

    if (!filePath && siteMap.errorRedirects && siteMap.errorRedirects[500]) {
      filePath = this.getFilePath(
        siteMap.errorRedirects && siteMap.errorRedirects[500]
      );
    } else if (!filePath) {
      filePath = this.getFilePath('/content/pages/error.yaml');
    }
    if (!this.fse.existsSync(filePath)) {
      filePath = this.get404Page(undefined, path);
    }
    let fileContents = this.fse.readFileSync(`${filePath}`, 'utf8');
    try {
      contents = yaml.loadAll(fileContents);
    } catch (ex) {
      contents = [{}];
    }
    return contents[0];
  }

  getIfMatchPagesOnRoute(siteConfig, path, errorCode) {
    let filePath = '';
    siteConfig.siteMap.errorRedirects &&
      Object.keys(siteConfig.siteMap.errorRedirects).forEach((key) => {
        if (typeof siteConfig.siteMap.errorRedirects[key] === 'object') {
          if (
            path.match(key) &&
            siteConfig.siteMap.errorRedirects[key][errorCode]
          ) {
            filePath = this.getFilePath(
              siteConfig.siteMap.errorRedirects[key][errorCode]
            );
          }
        }
      });
    return filePath;
  }

  get404Page(siteConfig, path) {
    const config = this.config;
    siteConfig = siteConfig || config.siteConfig;
    let filePath = '';
    filePath = this.getIfMatchPagesOnRoute(siteConfig, path, 404);
    if (
      !filePath &&
      siteConfig.siteMap.errorRedirects &&
      siteConfig.siteMap.errorRedirects[404]
    ) {
      filePath = this.getFilePath(
        siteConfig.siteMap.errorRedirects &&
          siteConfig.siteMap.errorRedirects[404]
      );
    } else if (!filePath) {
      filePath = this.getFilePath('/content/pages/404.yaml');
    }
    return filePath;
  }

  getLaunchWaitPage(siteConfig, targetPage = 'launchSoon') {
    const config = this.config;
    siteConfig = siteConfig || config.siteConfig;
    let filePath = '';
    if (
      siteConfig.siteMap.errorRedirects &&
      siteConfig.siteMap.errorRedirects[targetPage]
    ) {
      filePath = this.getFilePath(
        siteConfig.siteMap.errorRedirects &&
          siteConfig.siteMap.errorRedirects[targetPage]
      );
    } else {
      filePath = this.getFilePath('/content/pages/comingsoon.yaml');
    }
    return filePath;
  }
  getLaunchEndPage(siteConfig, targetPage = 'launchEnded') {
    const config = this.config;
    siteConfig = siteConfig || config.siteConfig;
    let filePath = '';
    if (
      siteConfig.siteMap.errorRedirects &&
      siteConfig.siteMap.errorRedirects[targetPage]
    ) {
      filePath = this.getFilePath(
        siteConfig.siteMap.errorRedirects &&
          siteConfig.siteMap.errorRedirects[targetPage]
      );
    } else {
      filePath = this.getFilePath('/content/pages/launchend.yaml');
    }
    return filePath;
  }

  getAppNameFromUrl(url) {
    return url.substr(0, url.indexOf('/'));
  }

  getPageData(path) {
    const config = this.config;
    let status = 200;
    const srcFile = path;
    const appPath = this.getAppNameFromUrl(srcFile);
    const currentSiteConfig = this.allSiteMaps[appPath] || config.siteConfig;

    const fullPath = `${this.contentFolder}/${srcFile}`;
    console.log('--serving=' + fullPath);
    let siblingData = {};
    let filePath = `${config.contentPath}/${srcFile}.yaml`;
    let isFile = true;
    let isLaunchMatch = false;
    let launchMatchKey = '';
    let launchTime = '';
    let launchEnded = '';
    if (currentSiteConfig.launchConfig) {
      Object.keys(currentSiteConfig.launchConfig).forEach((lKey) => {
        if (lKey === fullPath || fullPath.match(lKey)) {
          isLaunchMatch = true;
          launchMatchKey = lKey;
        }
      });
    }

    if (!this.fse.existsSync(filePath)) {
      filePath = `${config.contentPath}/${srcFile}/index.yaml`;
      isFile = false;
    }
    if (isLaunchMatch) {
      var timeToLaunch;
      var pageForWait;
      var pageForEnded;
      var timeToEnd;
      if (typeof currentSiteConfig.launchConfig[launchMatchKey] === 'object') {
        timeToLaunch = currentSiteConfig.launchConfig[launchMatchKey].start;
        timeToEnd = currentSiteConfig.launchConfig[launchMatchKey].end;
        pageForWait = currentSiteConfig.launchConfig[launchMatchKey].waitPath;
        pageForEnded = currentSiteConfig.launchConfig[launchMatchKey].waitEnded;
      } else {
        timeToLaunch = currentSiteConfig.launchConfig[launchMatchKey];
      }
      launchTime = timeToLaunch && utils.datetime.new(timeToLaunch).toISO();
      launchEnded = timeToEnd && utils.datetime.new(timeToEnd).toISO();
      const diffInSeconds = utils.datetime
        .new(timeToLaunch)
        .diffInSeconds(utils.datetime.new());
      const diffInSecondsEnd = utils.datetime
        .new(timeToEnd)
        .diffInSeconds(utils.datetime.new());
      if (diffInSeconds > 0) {
        filePath = this.getLaunchWaitPage(currentSiteConfig, pageForWait);
        isFile = true;
      } else if (diffInSecondsEnd < 0) {
        filePath = this.getLaunchEndPage(currentSiteConfig, pageForEnded);
        isFile = true;
      }
    }

    if (!this.fse.existsSync(filePath)) {
      filePath = this.get404Page(currentSiteConfig, fullPath);
      status = 404;
    } else if (!isLaunchMatch) {
      siblingData = this.getAllSiblings(
        `${config.contentPath}/${srcFile}`,
        isFile,
        fullPath
      );
    }

    let fileContents = this.fse.readFileSync(`${filePath}`, 'utf8');
    let currentNode = this.getPageNode(currentSiteConfig.siteMap, filePath);
    if (!currentNode) {
      currentNode = currentSiteConfig.siteMap;
    }
    let contents;
    try {
      contents = yaml.loadAll(fileContents);
    } catch (ex) {
      contents = [this.getErrorPage(currentSiteConfig, fullPath)];
    }
    console.log('app path found');

    const merged = {
      navigation: currentSiteConfig.siteMap.children,
      secondaryNavigation:
        currentNode !== currentSiteConfig.siteMap ? currentNode.children : [],
      pageConfig: {},
      userData: {
        launchTime,
        launchEnded,
        ...this.config.userData(),
      },
      parentPath: siblingData.parentPath || fullPath,
      siblingPages: siblingData.pages,
    };
    if (contents.length === 1) {
      contents = contents[0];
    }
    const data = {
      mode: config.mode,
      status,
      path: fullPath,
      site: config,
      extraParams: {
        ENV: process.env,
        envConfig: config.envConfig,
        launchTime,
      },
      siteConfig: currentSiteConfig,
      currentNode,
      merged,
    };
    data.pageData = this.processContent(contents, data) || {};
    return data;
  }

  processContent(contents, data) {
    if (contents && contents.inject) {
      Object.keys(contents.inject).forEach((key) => {
        if (typeof contents.inject[key] === 'string') {
          contents[key] = utils.object.getDataFromKey(
            data,
            contents.inject[key]
          );
        }
      });
    }
    if (contents && contents.items) {
      contents.items.forEach((item) => {
        if (item.inject) {
          Object.keys(item.inject).forEach((key) => {
            if (typeof item.inject[key] === 'string') {
              item[key] = utils.object.getDataFromKey(data, item.inject[key]);
            }
          });
        }
      });
    }
    return contents;
  }

  serveContent(req, res) {
    console.log('request->' + req.params['0']);
    this.getPageContent(req.params['0'])
      .then((response) => {
        // setTimeout(() => {
        res.status(response.status).send(response.data);
        // }, 3000);
      })
      .catch((response) => {
        res.status(response.status).send(response.data);
      });
  }
}

module.exports = ContentServer;
