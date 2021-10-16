let allTemplates = {
  contactus: require('./contactus')
};
module.exports = {
  templates: () => {
    return allTemplates;
  },
  set: (newTemplates) => {
    allTemplates = {
      ...allTemplates,
      ...newTemplates
    };
  }
};
