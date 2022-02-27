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
import * as componentsRoot from './components/components';
import * as components from './components';
import * as uiRoot from './components/ui/ui';
import * as ui from './components/ui';

const stores = { contentStore };


/* export module */
export { containers, components, ui, componentsRoot, uiRoot, stores, domain, globals, cordova, utils };
