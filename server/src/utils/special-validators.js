const object = require('./object');

module.exports = (validator) => {
  validator.addValidator('equals', (value, { subType = '=', matchValue, fieldName }, otherFields) => {
    const finalValue = fieldName ? object.getDataFromKey(otherFields, fieldName) : value;
    if (subType === '=') {
      return finalValue === matchValue;
    } else if (subType === 'bool') {
      return Boolean(finalValue) === Boolean(matchValue);
    } else if (subType === '!=') {
      return finalValue !== matchValue;
    }
  });
};
