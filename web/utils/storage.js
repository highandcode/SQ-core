import { GroupStorage, Storage, PreferenceStorage } from './comp-storage';

const icons = new GroupStorage();
const components = new Storage();
const containers = new Storage();
const dynamicComponents = new Storage();
const pageBuilder = new Storage();
const preference = new PreferenceStorage();

export { icons, components, containers, dynamicComponents, pageBuilder, preference };
