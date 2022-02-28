/* globals module */
import * as globals from './globals';

/* cordova module */
import * as cordova from './cordova';

/* utils module */
import * as utils from './utils';

/* stores module */
import contentStore from './store/contentStore';

/* domain module */
import domain from './domain';

/* containers module */
import * as containers from './containers';
import * as root from './components/root';
import * as components from './components';
import * as ui from './components/ui';

const stores = { contentStore };


/* export module */
export { containers, components, ui, root, stores, domain, globals, cordova, utils };
