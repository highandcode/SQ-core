/* globals module */
import * as globals from './globals';

/* cordova module */
import * as cordova from './cordova';

/* utils module */
import * as utils from './utils';

/* stores module */
// import contentStore from './store/contentStore';
import * as reducers from './redux';
/* domain module */
import domain from './domain';

/* containers module */
import * as containers from './containers';
import * as root from './components/root';
import * as components from './components';
import * as ui from './components/ui';
import adminConifg from './admin.config';


import './styles/index.scss';

containers.DynamicContent.registerContainers({
  ...containers.default,
});

export const config = {
  adminConifg,
};
/* export module */
export {
  containers,
  components,
  ui,
  root,
  reducers,
  domain,
  globals,
  cordova,
  utils,
};
