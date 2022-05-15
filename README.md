
# sq-core
Core framework for web, plugin, cms &amp; nodejs server

[![npm](https://img.shields.io/npm/dm/sq-core.svg)](https://www.npmjs.com/package/sq-core)
[![npm](https://img.shields.io/npm/v/sq-core.svg)](https://www.npmjs.com/package/sq-core)


## Demos

- **Basic demo**: https://www.nybblecore.com/content/in/examples/basic
- **Full list**: https://www.nybblecore.com/content/in/examples/special



## Download and Install sq-core

### Install from npm

```
npm install sq-core
```
## Available Modules

At present, we officially aim to support give 3 modules

- Web (React)
- CMS Server
- Vannila JS

## CMS Server

```
require('dotenv').config();
var express = require('express');
var path = require('path');
var fs = require('fs');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var utils = require('sq-core/server/src/utils');
var { ContentServer } = require('sq-core/cms/server');

var routes = require('./routes');
var config = require('../config/environment');
var webConfig = require('../src/config');
var siteConfig = require('./site.config');

var app = express();

// Content server
var cmsSever = new ContentServer(
  {
    contentPath: path.resolve('./content'),
    serverPath: '/content/*',
    siteConfig: siteConfig,
    damAssets: path.resolve('./dam'),
    clientLibs: path.resolve('./clientlibs'),
    rootApp: path.resolve('./'),
    envConfig: config,
    mode: config.env,
    siteConfig: siteConfig
  },
  app
);
// cms initialization
cmsSever.init();
cmsSever.mapVanity(webConfig.urlMapping, {
  defaultPage: '/in/reactapp'
});
```

