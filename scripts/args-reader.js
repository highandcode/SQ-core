
class ArgsReader {
  constructor(keys = ['--']) {
    this.dataKeys = keys;
  }
  
  get() {
    var args = {};
    this.dataKeys.forEach((dataKey) => {
      process.argv.forEach((key) => {
        if (key.indexOf(dataKey) > -1) {
          var split = key.split('=');
          var keyToSet = split[0].replace('--', '');
          args[keyToSet] = split[1];
        }
      });
    });
    return args;
  }
}

module.exports = ArgsReader;