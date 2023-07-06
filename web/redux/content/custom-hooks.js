import { CONSTANTS } from '../../globals';
import CustomModule from '../../utils/custom-module';
const customHooks = new CustomModule();

customHooks.add('data', {
  extractResult: (result, { dataKey = 'data', rootKey = 'data', rootErrorKey = 'error', index = 0 } = {}) => {
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (result[rootKey] && result[rootKey][dataKey] && result[rootKey][dataKey].length > index) {
        return result[rootKey][dataKey][index];
      }
    } else if (result.status === CONSTANTS.STATUS.ERROR) {
      if (result[rootErrorKey] && result[rootErrorKey]) {
        return result[rootErrorKey];
      }
    }
    return null;
  },
});

customHooks.add('contentPages', {
  extractDataArray: (result) => {
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      return {
        ...result.data,
        pages: result.data.data,
      };
    }
  },
});

export { customHooks };
