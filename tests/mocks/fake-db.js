const fakeCollections = (objRef = {}, coll) => {
  const { data = {} } = objRef
  return {
    find: () => Promise.resolve(data[coll]),
    findOne: () => Promise.resolve(data[coll]),
    deleteOne: () => Promise.resolve(data[coll]),
    updateAll: () => Promise.resolve(data[coll]),
    deleteMany: () => Promise.resolve(data[coll]),
    update: () => Promise.resolve(data[coll]),
    insert: () => Promise.resolve(data[coll]),
    aggregate: () => Promise.resolve(data[coll])
  }
};

module.exports = (collections) => {
  var retObj = {
    connect: () => { },
    collections: {},
    returns: (data) => {
      retObj.data = data;
      return retObj;
    }
  };
  collections.forEach((coll) => {
    retObj.collections[coll] = fakeCollections(retObj, coll);
  });
  return retObj;
}