const QueryString = require('../../server/src/utils/query-string');
const location = window.location;

const query = {
  get: (search) => {
    return new QueryString(search || location.search).toObject();
  }
};
export default QueryString;
export {
  query,
  QueryString
};