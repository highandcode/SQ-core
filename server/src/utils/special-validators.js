const object = require('./object');
const validator = require('./validator');

validator.addValidator('equals', (value, { subType = '=', matchValue, fieldName }, otherFields) => {
  const finalValue = fieldName ? object.getDataFromKey(otherFields, fieldName) : value;
  if (subType === '=') {
    return finalValue === matchValue;
  } else if (subType === '!=') {
    return finalValue !== matchValue;
  }
});