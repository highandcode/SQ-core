class Classes {
  generate(config = {}) {
    Object.keys(config).forEach((key) => {
      const set = config[key];
      config[key] = this.generateClasses(set);
    });
    return config;
  }

  generateClasses(config = {}) {
    config.root = config.root || '';
    config.main = 'main';
    Object.keys(config).forEach((key) => {
      if (key !== 'prefix') {
        let elemOrMod = '__';
        let keyToRender = config[key];
        if (config[key].substr(0, 2) === 'm:') {
          elemOrMod = '--';
          keyToRender = config[key].substr(2);
        }
        config[key] = config.prefix + (keyToRender ? elemOrMod + keyToRender : '');
      }
    });
    return config;
  }
}

export { Classes };
export default new Classes();
