/* globals module */
import * as globals from './globals';

/* cordova module */
import * as cordova from './cordova';

/* utilsvmodule */
import * as utils from './utils';

/* stores module */
import contentStore from './store/contentStore';

/* domain module */
import * as collection from './domain/collections';
import * as entity from './domain/entity';
import * as helpers from './domain/helpers';
import * as repository from './domain/repository';

/* containers module */
import * as containers from './containers';
import * as componentsRoot from './components/components';
import * as components from './components';
import * as uiRoot from './components/ui/ui';
import * as ui from './components/ui';

const stores = { contentStore };

const domain = { collection, entity, helpers, repository };

/* export module */
export { containers, components, ui, componentsRoot, uiRoot, stores, domain, globals, cordova, utils };
