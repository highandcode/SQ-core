import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as utils from '../../utils';
import { customHooks } from './custom-hooks';
import { Validator } from '../../utils/validator';
import path from '../../utils/path';
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
  metaData: {},
  protectedData: {},
  isContentLoading: false,
};

export const parseCustomModule = (text) => {
  const moduleName =
    text.indexOf('(') > -1 ? text.substr(0, text.indexOf('(')) : text;
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
  if (key && key.toString().substr(0, 2) === '::') {
    const moduleName = key.toString().split('::');
    const passedKey = key
      .substr(key.toString().lastIndexOf('::') + 2, key.length - 4)
      .trim();
    let parsedModule = parseCustomModule(moduleName[1]);
    if (passedKey.substr(0, 1) === '.') {
      value = object.getDataFromKey(
        userData,
        passedKey.substr(1),
        defaultValue
      );
    } else {
      value = passedKey;
    }
    if (parsedModule) {
      value = processor.execute(
        parsedModule.module,
        value,
        parsedModule.params,
        { state, userData }
      );
    }
  } else if (key && key.toString().substr(0, 1) === '.') {
    value = object.getDataFromKey(userData, key.substr(1), defaultValue);
  } else if (!common.isNullOrUndefined(key)) {
    value = key;
  }
  return value;
};
export const processParams = (
  userData,
  params = {},
  defaultValue = null,
  state
) => {
  const newObj = {};
  Object.keys(params).forEach((key) => {
    let value;
    if (
      typeof params[key] === 'object' &&
      params[key] !== null &&
      params[key].match
    ) {
      const validator = new Validator(params[key].match);
      validator.setValues(userData);
      value = validator.validateAll();
    } else if (typeof params[key] === 'object' && params[key] !== null) {
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

const extractUrlInfo = (url, config) => {
  if (config) {
    let isFound = false;
    let output;
    Object.keys(config).forEach((urlKey) => {
      if (!isFound && url.match(new RegExp(urlKey))) {
        isFound = true;
        output = {};
        const foundCOnfig = config[urlKey];
        if (foundCOnfig.url) {
          output.url = foundCOnfig.url;
        }
        if (foundCOnfig.params) {
          output.params = processParams({ url }, foundCOnfig.params);
        }
        if (foundCOnfig.method) {
          output.method = foundCOnfig.method;
        }
      }
    });
    if (output) {
      return output;
    }
  }
  return {};
};

const clearUrl = (url) => {
  if (url.indexOf('/index.html') > -1) {
    url = url.replace('/index.html', '');
  } else if (url.indexOf('.html') > -1) {
    url = url.replace('.html', '');
  }
  return path.ensureNoSlashAtEnd(url);
};

export const fetchJsonPath = ({ url, params, headers }) => {
  const mode = window.APP_CONFIG?.siteMode === 'static' ? 'get' : 'post';
  url = clearUrl(url);
  const {
    url: overrideUrl,
    params: overrideParams,
    method: overrideMethod,
  } = extractUrlInfo(url, window.APP_CONFIG?.siteMap?.dynamicContentConfig);
  const postFix = !overrideUrl && mode === 'get' ? '/get.json' : '';

  const cb = mode === 'get' ? { _cb: window.APP_CONFIG?.appVersion } : {};

  return apiBridge[overrideMethod || mode](
    `${overrideUrl || url}${postFix}`,
    { ...cb, ...(overrideParams || params) },
    headers
  );
};

export const fetchContentPage = createAsyncThunk(
  'content/fetchContentPage',
  async (url) => {
    const fullUrl = url || location.href;

    let response = await fetchJsonPath({ url: fullUrl });
    if (response.error) {
      if (window.APP_CONFIG?.siteMap?.errorRedirects[response.code]) {
        response = await fetchJsonPath({
          url: window.APP_CONFIG?.siteMap?.errorRedirects[response.code],
        });
      }
    }
    // The value we return becomes the `fulfilled` action payload
    return {
      data: response.data,
      pageId: url,
    };
  }
);
export const sendContact = createAsyncThunk(
  'content/sendContact',
  async (data) => {
    const response = await apiBridge.post(
      data.url || '/api/v1/contact/message',
      data.payload
    );
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const updateErrorData = (data) => (dispatch) => {
  console.log('error data', data);
  const errors = {
    lastError: {},
  };
  Object.keys(data).forEach((errorKey) => {
    if (data[errorKey]?.errors) {
      errors[`${errorKey}_errors`] = data[errorKey]?.errors;
    } else if (data[errorKey]?.error) {
      errors.lastError[errorKey] = data[errorKey];
    }
  });
  if (data.error === true) {
    errors.lastError = {
      ...errors.lastError,
      ...data,
    };
  }
  dispatch(updateUserData(errors));
};

export const checkAndPostApi = (data) => async (dispatch) => {
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

export const initApplication = (data) => async (dispatch) => {
  let response = {};
  if (data.globals && data.globals.path) {
    const result = await fetchJsonPath({ url: data.globals.path });
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
    if (pageData.hook?.afterLoad) {
      await dispatch(checkAndPostApi(pageData.hook.afterLoad));
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
        params: processParams(
          getState().content.userData,
          payload.params,
          undefined,
          getState()
        ),
        headers: processParams(
          getState().content.userData,
          payload.headers,
          undefined,
          getState()
        ),
        query: processParams(
          getState().content.userData,
          payload.query,
          undefined,
          getState()
        ),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
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
    const data = payload.dataKey
      ? { [payload.dataKey]: response.data }
      : response.data;
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
      mergeUserData({
        ...payload.preCall,
      })
    );
  }
  let response = { status: 'success', data: {} };
  if (payload.preHook) {
    response = await customHooks.execute(payload.preHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(
          getState().content.userData,
          payload.params,
          undefined,
          getState()
        ),
        headers: processParams(
          getState().content.userData,
          payload.headers,
          undefined,
          getState()
        ),
        query: processParams(
          getState().content.userData,
          payload.query,
          undefined,
          getState()
        ),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
    });
  }
  if (payload.method && payload.url) {
    let paramToProcess = { method: payload.method, url: payload.url };
    paramToProcess = processParams(
      getState().content.userData,
      paramToProcess,
      undefined,
      getState()
    );
    response = await apiBridge[paramToProcess.method.toLowerCase()](
      paramToProcess.url,
      processParams(
        getState().content.userData,
        payload.params,
        undefined,
        getState()
      ),
      processParams(
        getState().content.userData,
        payload.headers,
        undefined,
        getState()
      ),
      processParams(
        getState().content.userData,
        payload.query,
        undefined,
        getState()
      )
    );
  }

  if (payload.postHook) {
    response = await customHooks.execute(payload.postHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(
          getState().content.userData,
          payload.params,
          undefined,
          getState()
        ),
        headers: processParams(
          getState().content.userData,
          payload.headers,
          undefined,
          getState()
        ),
        query: processParams(
          getState().content.userData,
          payload.query,
          undefined,
          getState()
        ),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
    });
  }

  response = object.extendData(
    payload.defaultResponse &&
      (payload.defaultResponse[response.status] ||
        payload.defaultResponse.error),
    response
  );

  const { notification } = response || {};
  if (notification) {
    await dispatch(showNotificationMessage(notification));
  }

  if (payload.postCall) {
    await dispatch(
      mergeUserData({
        ...payload.postCall,
      })
    );
  }
  if (response.status === 'success') {
    const data = payload.dataKey
      ? { [payload.dataKey]: response.data }
      : response.data;
    if (payload.saveType === 'protected') {
      await dispatch(
        updateProtectedUserData({
          ...data,
        })
      );
    } else {
      await dispatch(
        updateUserData({
          ...data,
          lastError: {},
        })
      );
    }
  } else if (response.status === 'error') {
    await dispatch(updateErrorData(response.error));
  }
  if (payload.after) {
    dispatch(checkAndPostApi(payload.after));
  }

  return response;
};

export const downloadApi = (payload) => async (dispatch, getState) => {
  if (payload.match) {
    const validator = new Validator(payload.match);
    validator.setValues(selectUserData(getState()));
    if (!validator.validateAll()) {
      return;
    }
  }
  if (payload.preCall) {
    await dispatch(
      mergeUserData({
        ...payload.preCall,
      })
    );
  }
  let response = { status: 'success', data: {} };
  if (payload.preHook) {
    response = await customHooks.execute(payload.preHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(
          getState().content.userData,
          payload.params,
          undefined,
          getState()
        ),
        headers: processParams(
          getState().content.userData,
          payload.headers,
          undefined,
          getState()
        ),
        query: processParams(
          getState().content.userData,
          payload.query,
          undefined,
          getState()
        ),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
    });
  }
  if (payload.href || payload.url) {
    let paramToProcess = {
      method: payload.method,
      url: payload.url,
      href: payload.href,
    };
    paramToProcess = processParams(
      getState().content.userData,
      paramToProcess,
      undefined,
      getState()
    );
    const method = paramToProcess.method || 'get';
    await apiBridge[method](
      paramToProcess.href || paramToProcess.url,
      processParams(
        getState().content.userData,
        payload.params,
        undefined,
        getState()
      ),
      processParams(
        getState().content.userData,
        payload.headers,
        undefined,
        getState()
      ),
      processParams(
        getState().content.userData,
        payload.query,
        undefined,
        getState()
      ),
      { plain: true }
    )
      .then((res) => {
        return res.blob();
      })
      .then((data) => {
        var blob = new Blob([data], { type: 'application/octetstream' });
        var url = window.URL || window.webkitURL;
        const link = url.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = link;
        var newurl = payload.href || payload.url;
        const strip =
          newurl.indexOf('?') > -1 ? newurl.indexOf('?') : newurl.length;
        const exactUrl = newurl.substr(0, strip);
        const fileName =
          exactUrl.substr(exactUrl.lastIndexOf('/') + 1) || 'no-name';
        a.download = payload.fileName || fileName; // this should be the file name with the required extension
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(link);
      });
  }

  if (payload.postHook) {
    response = await customHooks.execute(payload.postHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams(
          getState().content.userData,
          payload.params,
          undefined,
          getState()
        ),
        headers: processParams(
          getState().content.userData,
          payload.headers,
          undefined,
          getState()
        ),
        query: processParams(
          getState().content.userData,
          payload.query,
          undefined,
          getState()
        ),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
    });
  }

  response = object.extendData(
    payload.defaultResponse &&
      (payload.defaultResponse[response.status] ||
        payload.defaultResponse.error),
    response
  );

  const { notification } = response || {};
  if (notification) {
    await dispatch(showNotificationMessage(notification));
  }

  if (payload.postCall) {
    await dispatch(
      mergeUserData({
        ...payload.postCall,
      })
    );
  }
  if (response.status === 'success') {
    const data = payload.dataKey
      ? { [payload.dataKey]: response.data }
      : response.data;
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
    updateMetaData: (state, action) => {
      state.metaData = {
        prev: state.metaData?.latest,
        latest: {
          url: action.payload.url,
          ...action.payload.data,
        },
      };
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
  const data = processParams(
    getState().content.userData,
    { ...root.merge, ...payload },
    '',
    getState()
  );
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

export const {
  updateProtectedUserData,
  updateUserData,
  clearAllUserData,
  updateMetaData,
} = content.actions;
export default content.reducer;
export { customHooks };
