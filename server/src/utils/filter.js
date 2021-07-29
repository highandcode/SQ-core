const escapedChars = ['+'];
const mongoose = require('mongoose');

const escapeValue = (val) => {
  if (val) {
    val = val.toString();
    escapedChars.forEach((char) => {
      val = val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    });
  }
  return val;
};

module.exports = {
  ignoreCase: function (value) {
    value = escapeValue(value);
    return { $regex: `^${value}$`, $options: 'i' };
  },
  includes: function (value) {
    value = escapeValue(value);
    return { $regex: `${value}`, $options: 'i' };
  },
  objectId: function (value) {
    return mongoose.Types.ObjectId(value);
  }
};
