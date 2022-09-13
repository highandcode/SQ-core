import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as utils from '../../utils';
import CustomModule from '../../utils/custom-module';
import { Validator } from '../../utils/validator';
import { showNotificationMessage } from '../common';
const { queryString, apiBridge, object, common, processor } = utils;
const { query } = queryString;

const getSystem = () => {
  return {
    query: query.get(),
  };
};

const initialState = {
  pageData: {},
  userData: {
    ...getSystem(),
  },
  protectedData: {},
  isContentLoading: false,
};
export const customHooks = new CustomModule();

export const parseCustomModule = (text) => {
  const moduleName = text.indexOf('(') > -1 ? text.substr(0, text.indexOf('(')) : text;
  let params = {};
  const fnMatch = text.match(/[(].*[)]/);
  if (fnMatch) {
    const str = fnMatch[0].substr(1, fnMatch[0].length - 2);
    const arrayParams = str.split(',');
    arrayParams.forEach((itemParam) => {
      var arr = itemParam.trim().split(':');
      if (arr[0]) {
        params[arr[0]] = arr[1]?.trim() || '';
      }
    });
  }
  return {
    module: moduleName,
    params,
  };
};
export const processEachParam = (userData, key, defaultValue, state) => {
  let value;
   if (key.toString().substr(0, 2) === '::') {
    const moduleName = key.toString().split('::');
    const passedKey = key.substr(key.toString().lastIndexOf('::') + 2, key.length - 4);
    let parsedModule = parseCustomModule(moduleName[1]);
    if (passedKey.substr(0, 1) === '.') {
      value = object.getDataFromKey(userData, passedKey.substr(1), defaultValue);
    } else {
      value = passedKey;
    }
    if (parsedModule) {
      value = processor.execute(parsedModule.module, value, parsedModule.params, { state, userData });
    }
  } else if (key.toString().substr(0, 1) === '.') {
    value = object.getDataFromKey(userData, key.substr(1), defaultValue);
  } else if (!common.isNullOrUndefined(key)) {
    value = key;
  }
  return value;
};
export const processParams = (userData, params = {}, defaultValue = null, state) => {
  const newObj = {};
  Object.keys(params).forEach((key) => {
    let value;
    if (typeof params[key] === 'object' && params[key].match) {
      const validator = new Validator(params[key].match);
      validator.setValues(userData);
      value = validator.validateAll();
    } else if (typeof params[key] === 'object') {
      value = processParams(userData, params[key], defaultValue, state);
    } else {
      value = processEachParam(userData, params[key], defaultValue, state);
    }
    if (!common.isNullOrUndefined(value)) {
      newObj[key] = value;
    }
  });
  return newObj;
};

export const fetchContentPage = createAsyncThunk('content/fetchContentPage', async (url) => {
  const fullUrl = url || location.href;
  const mode = window.APP_CONFIG.siteMode === 'static' ? 'get' : 'post';
  const postFix = mode === 'get' ? '/get.json' : '';
  
  let response = await apiBridge[mode](`${fullUrl}${postFix}`);
  if (response.error) {
    if (window.APP_CONFIG?.siteMap?.errorRedirects[response.code]) {
      response = await apiBridge[mode](`${window.APP_CONFIG?.siteMap?.errorRedirects[response.code]}${postFix}`);
    }
  }
  // The value we return becomes the `fulfilled` action payload
  return {
    data: response.data,
    pageId: url,
  };
});
export const sendContact = createAsyncThunk('content/sendContact', async (data) => {
  const response = await apiBridge.post(data.url || '/api/v1/contact/message', data.payload);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const updateErrorData = (data) => (dispatch, getState) => {
  const errors = {
    lastError: {},
  };
  Object.keys(data).forEach((errorKey) => {
    if (data[errorKey]?.errors) {
      errors[`${errorKey}_errors`] = data[errorKey]?.errors;
    } else {
      errors.lastError[errorKey] = data[errorKey];
    }
  });
  dispatch(updateUserData(errors));
};

export const checkAndPostApi = (data) => async (dispatch, getState) => {
  const result = [];
  if (Array.isArray(data)) {
    data.forEach((item) => {
      result.push(dispatch(postApi(item)));
    });
  } else {
    result.push(dispatch(postApi(data)));
  }
  return Promise.all(result);
};

export const initApplication = (data) => async (dispatch, getState) => {
  let response = {};
  if (data.globals && data.globals.path) {
    const result = await apiBridge.post(data.globals.path, {});
    const pageData = result.data.pageData;
    await dispatch(
      updateProtectedUserData({
        root: { ...data, ...pageData },
      })
    );
    if (pageData.merge) {
      await dispatch(mergeUserData(pageData.merge));
    }
    if (pageData.hook?.load) {
      await dispatch(checkAndPostApi(pageData.hook.load));
    }
  } else {
    await dispatch(
      updateProtectedUserData({
        root: { ...data },
      })
    );
  }

  return response;
};

export const executeHook = (payload) => async (dispatch, getState) => {
  let response = {};
  if (payload.preCall) {
    await dispatch(
      updateUserData({
        ...payload.preCall,
      })
    );
  }
  if (payload.hook) {
    response = await customHooks.execute(payload.hook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(getState().content.userData, payload.params, undefined, getState()),
        headers: processParams(getState().content.userData, payload.headers, undefined, getState()),
        query: processParams(getState().content.userData, payload.query, undefined, getState()),
      },
      userData: getState().content.userData,
      dispatch,
    });
  }
  if (payload.postCall) {
    await dispatch(
      updateUserData({
        ...payload.postCall,
      })
    );
  }

  if (response.status === 'success') {
    const data = payload.dataKey ? { [payload.dataKey]: response.data } : response.data;
    await dispatch(
      updateUserData({
        ...data,
        lastError: {},
      })
    );
  } else if (response.status === 'error') {
    await dispatch(updateErrorData(response.error));
  }
  if (payload.after) {
    dispatch(checkAndPostApi(payload.after));
  }

  return response;
};

export const postApi = (payload) => async (dispatch, getState) => {
  if (payload.match) {
    const validator = new Validator(payload.match);
    validator.setValues(selectUserData(getState()));
    if (!validator.validateAll()) {
      return;
    }
  }
  if (payload.preCall) {
    await dispatch(
      updateUserData({
        ...payload.preCall,
      })
    );
  }
  let response = { data: {} };
  if (payload.preHook) {
    response = await customHooks.execute(payload.preHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(getState().content.userData, payload.params, undefined, getState()),
        headers: processParams(getState().content.userData, payload.headers, undefined, getState()),
        query: processParams(getState().content.userData, payload.query, undefined, getState()),
      },
      userData: getState().content.userData,
      dispatch,
    });
  }
  if (payload.method && payload.url) {
    response = await apiBridge[payload.method.toLowerCase()](
      payload.url,
      processParams(getState().content.userData, payload.params, undefined, getState()),
      processParams(getState().content.userData, payload.headers, undefined, getState()),
      processParams(getState().content.userData, payload.query, undefined, getState())
    );
  }

  if (payload.postHook) {
    response = await customHooks.execute(payload.postHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(getState().content.userData, payload.params, undefined, getState()),
        headers: processParams(getState().content.userData, payload.headers, undefined, getState()),
        query: processParams(getState().content.userData, payload.query, undefined, getState()),
      },
      userData: getState().content.userData,
      dispatch,
    });
  }

  response = object.extendData(
    payload.defaultResponse && (payload.defaultResponse[response.status] || payload.defaultResponse.error),
    response
  );

  const { notification } = response || {};
  if (notification) {
    await dispatch(showNotificationMessage(notification));
  }

  if (payload.postCall) {
    await dispatch(
      updateUserData({
        ...payload.postCall,
      })
    );
  }
  if (response.status === 'success') {
    const data = payload.dataKey ? { [payload.dataKey]: response.data } : response.data;
    await dispatch(
      updateUserData({
        ...data,
        lastError: {},
      })
    );
  } else if (response.status === 'error') {
    await dispatch(updateErrorData(response.error));
  }
  if (payload.after) {
    dispatch(checkAndPostApi(payload.after));
  }

  return response;
};

const content = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updatePageData: (state, action) => {
      state.pageData[action.payload.pageId] = action.payload.data;
    },

    updateProtectedUserData: (state, action) => {
      state.protectedData = {
        ...state.protectedData,
        ...action.payload,
      };
      state.userData = {
        ...state.userData,
        ...action.payload,
        ...getSystem(),
      };
    },

    clearAllUserData: (state) => {
      state.userData = {
        ...state.protectedData,
        ...getSystem(),
      };
    },
    updateUserData: (state, action) => {
      state.userData = {
        ...state.userData,
        ...action.payload,
        ...getSystem(),
      };
    },
  },
});

export const resetLastError = () => (dispatch) => {
  dispatch(
    updateUserData({
      lastError: {},
    })
  );
};

export const selectRootData = (state) => {
  return state.content.protectedData.root || {};
};

export const selectUserData = (state) => {
  return state.content.userData;
};

export const mergeUserData = (payload) => (dispatch, getState) => {
  const root = selectRootData(getState());
  const data = processParams(getState().content.userData, { ...root.merge, ...payload }, '', getState());
  const merged = object.extendData(getState().content.userData, data);
  dispatch(updateUserData(merged));
};
export const resetUserData = (payload) => (dispatch, getState) => {
  switch (payload.type) {
    case 'clearAll':
      dispatch(content.actions.clearAllUserData());
      break;
  }
};

export const { updateProtectedUserData, updatePageData, updateUserData } = content.actions;
export default content.reducer;
