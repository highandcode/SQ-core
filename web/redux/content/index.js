import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as utils from '../../utils';
import { customHooks } from './custom-hooks';
import { Validator } from '../../utils/validator';
import path from '../../utils/path';
import { showNotificationMessage } from '../common';
import { events } from '../../utils/app-events';
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
  const moduleName = text.indexOf('(') > -1 ? text.substr(0, text.indexOf('(')) : text;
  let params = {};
  const fnMatch = text.match(/[(].*[)]/);
  if (fnMatch) {
    const str = fnMatch[0].substr(1, fnMatch[0].length - 2);
    const arrayParams = str.split(',');
    arrayParams.forEach((itemParam) => {
      const askVal = itemParam.trim();
      var arr = [askVal.substr(0, askVal.indexOf(':')), askVal.substr(askVal.indexOf(':') + 1).trim()];
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
    const passedKey = key.substr(key.toString().lastIndexOf('::') + 2, key.length - 4).trim();
    let parsedModule = parseCustomModule(moduleName[1]);
    if (passedKey.substr(0, 1) === '.') {
      value = object.getDataFromKey(userData, passedKey.substr(1), defaultValue);
    } else {
      value = passedKey;
    }
    if (parsedModule) {
      value = processor.execute(parsedModule.module, value, parsedModule.params, { state, userData });
    }
  } else if (key && key.toString().substr(0, 1) === '.') {
    value = object.getDataFromKey(userData, key.substr(1), defaultValue);
  } else if (!common.isNullOrUndefined(key)) {
    value = key;
  }
  return value;
};
export const processParams = (userData, params = {}, defaultValue = null, state) => {
  let newObj = {};
  Object.keys(params).forEach((key) => {
    let value;
    if (typeof params[key] === 'object' && params[key] !== null && params[key].match) {
      const validator = new Validator(params[key].match);
      validator.setValues(userData);
      value = validator.validateAll();
    } else if (typeof params[key] === 'object' && params[key] !== null && !Array.isArray(params[key])) {
      value = processParams(userData, params[key], defaultValue, state);
    } else {
      value = processEachParam(userData, params[key], defaultValue, state);
    }
    if (!common.isNullOrUndefined(value)) {
      if (key.startsWith('...') && typeof value === 'object' && !Array.isArray(value)) {
        newObj = { ...newObj, ...value };
      } else {
        newObj[key] = value;
      }
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
  const { url: overrideUrl, params: overrideParams, method: overrideMethod } = extractUrlInfo(url, window.APP_CONFIG?.siteMap?.siteMap?.dynamicContentConfig);
  const postFix = !overrideUrl && mode === 'get' ? '/get.json' : '';

  const cb = mode === 'get' ? { _cb: window.APP_CONFIG?.appVersion } : {};

  return apiBridge[overrideMethod || mode](`${overrideUrl || url}${postFix}`, { ...cb, ...(overrideParams || params) }, headers);
};

export const fetchContentPage = createAsyncThunk('content/fetchContentPage', async (url) => {
  const fullUrl = url || location.href;

  let response = await fetchJsonPath({ url: fullUrl });
  if (response.error) {
    if (window.APP_CONFIG?.siteMap.siteMap?.errorRedirects[response.code]) {
      response = await fetchJsonPath({
        url: window.APP_CONFIG?.siteMap.siteMap?.errorRedirects[response.code],
      });
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

export const updateErrorData = (data) => (dispatch) => {
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

export const checkAndPostApi = (data, pageData, prevAction) => async (dispatch) => {
  const result = [];
  if (data.bulk && Array.isArray(data.bulk)) {
    data.bulk.forEach((item) => {
      result.push(dispatch(postApi({ ...item, currentData: prevAction?.currentData }, pageData)));
    });
  } else {
    if (Array.isArray(data)) {
      data.forEach((item) => {
        result.push(dispatch(postApi({ ...item, currentData: prevAction?.currentData }, pageData)));
      });
    } else {
      if (prevAction?.currentData) {
        data.currentData = prevAction?.currentData;
      }
      result.push(dispatch(postApi(data, pageData)));
    }
  }
  return Promise.all(result);
};

export const initApplication = (data) => async (dispatch) => {
  let response = {};
  if (data.globals && data.globals.path) {
    const result = await fetchJsonPath({ url: data.globals.path });
    const pageData = result.data.pageData;
    await dispatch(
      updateUserData({
        isSubmitting: false,
      })
    );
    await dispatch(
      updateProtectedUserData({
        root: { ...data, ...pageData },
      })
    );
    if (pageData.merge) {
      await dispatch(mergeUserData(pageData.merge));
    }
    if (pageData.hook?.load) {
      await dispatch(checkAndPostApi(pageData.hook.load, pageData));
    }
    if (pageData.hook?.afterLoad) {
      await dispatch(checkAndPostApi(pageData.hook.afterLoad, pageData));
    }
  } else {
    await dispatch(
      updateProtectedUserData({
        root: { ...data },
      })
    );
  }
  events.emit('application.config.onLoad', data);
  return response;
};

export const executeHook = (payload, pageData) => async (dispatch, getState) => {
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
    dispatch(checkAndPostApi(payload.after, pageData, payload));
  }

  return response;
};

export const postApi = (payload, pageResponse) => async (dispatch, getState) => {
  const currentData = payload.currentData || {};
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
        params: processParams({ ...getState().content.userData, ...currentData }, payload.params, undefined, getState()),
        headers: processParams({ ...getState().content.userData, ...currentData }, payload.headers, undefined, getState()),
        query: processParams({ ...getState().content.userData, ...currentData }, payload.query, undefined, getState()),
      },
      userData: { ...getState().content.userData, ...currentData },
      dispatch,
      getState,
    });
  }
  if (payload.method && payload.url) {
    let paramToProcess = { method: payload.method, url: payload.url };
    paramToProcess = processParams({ ...getState().content.userData, ...currentData }, paramToProcess, undefined, getState());
    response = await apiBridge[paramToProcess.method.toLowerCase()](
      paramToProcess.url,
      processParams({ ...getState().content.userData, ...currentData }, payload.params, undefined, getState()),
      processParams({ ...getState().content.userData, ...currentData }, payload.headers, undefined, getState()),
      processParams({ ...getState().content.userData, ...currentData }, payload.query, undefined, getState())
    );
  }

  if (payload.postHook) {
    response = await customHooks.execute(payload.postHook, response, {
      state: getState(),
      payload,
      data: {
        params: processParams({ ...getState().content.userData, ...currentData }, payload.params, undefined, getState()),
        headers: processParams({ ...getState().content.userData, ...currentData }, payload.headers, undefined, getState()),
        query: processParams({ ...getState().content.userData, ...currentData }, payload.query, undefined, getState()),
      },
      userData: { ...getState().content.userData, ...currentData },
      dispatch,
      getState,
    });
  }

  let finalObj = {};
  if (payload.defaultResponse && payload.defaultResponse[response.status]) {
    if (Array.isArray(payload.defaultResponse[response.status])) {
      let isValid = false;
      payload.defaultResponse[response.status].forEach((item) => {
        if (item.match && !isValid) {
          const valid = new Validator(item.match);
          valid.setValues({ ...getState().content.userData, ...currentData });
          if (valid.validateAll()) {
            finalObj = item;
            isValid = true;
          }
        }
      });
    } else {
      finalObj = payload.defaultResponse && (payload.defaultResponse[response.status] || payload.defaultResponse.error);
    }
  }
  response = object.extendData(finalObj, response);

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
    const data = payload.dataKey ? { [payload.dataKey]: response.data } : response.data;
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
    if (payload?.finally?.successAction) {
      if (Array.isArray(payload?.finally?.successAction)) {
        payload?.finally?.successAction.forEach((actionItem) => {
          let isValid = true;
          if (actionItem.match) {
            const vldtr = new Validator(actionItem.match);
            vldtr.setValues({ ...getState().content.userData, ...currentData });
            isValid = vldtr.validateAll();
          }
          isValid && events.emit('dynammicContent.onAction', {}, {...actionItem, currentData}, {});
        });
      } else {
        events.emit('dynammicContent.onAction', {}, { ...payload?.finally?.successAction, currentData}, {});
      }
    }
    if (payload.successAfterScript) {
      utils.browser.scriptManager.insertDynamicScript(payload.successAfterScript, 'body');
    }
  } else if (response.status === 'error') {
    await dispatch(updateErrorData(response.error));
    if (payload.action?.finally?.errorAction) {
      if (Array.isArray(payload.action.finally.errorAction)) {
        payload?.finally?.errorAction.forEach((actionItem) => {
          let isValid = true;
          if (actionItem.match) {
            const vldtr = new Validator(actionItem.match);
            vldtr.setValues({ ...getState().content.userData, ...currentData });
            isValid = vldtr.validateAll();
          }
          isValid && events.emit('dynammicContent.onAction', {},  {...actionItem, currentData}, {});
        });
      } else {
        events.emit('dynammicContent.onAction', {}, { ...payload?.finally?.errorAction, currentData }, {});
      }
    }
    if (payload.errorAfterScript) {
      utils.browser.scriptManager.insertDynamicScript(payload.errorAfterScript, 'body');
    }
  }
  if (payload.runInit) {
    dispatch(mergeUserData(pageResponse?.pageData?.init));
  }
  if (payload.runMerge) {
    dispatch(mergeUserData(pageResponse?.pageData?.merge));
  }
  if (payload.after) {
    dispatch(checkAndPostApi(payload.after, pageResponse, payload));
  }

  return response;
};

export const uploadApi = (payload, pageResponse) => async (dispatch, getState) => {
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
        params: processParams(getState().content.userData, payload.params, undefined, getState()),
        headers: processParams(getState().content.userData, payload.headers, undefined, getState()),
        query: processParams(getState().content.userData, payload.query, undefined, getState()),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
    });
  }
  if (payload.url) {
    let paramToProcess = { method: payload.method, url: payload.url };
    paramToProcess = processParams(getState().content.userData, paramToProcess, undefined, getState());
    let formData = new FormData();
    payload.data.files.forEach((file) => {
      formData.append('file', file);
    });
    response = await utils.apiBridge.rawPost(paramToProcess.url, formData, processParams(getState().content.userData, payload.headers, undefined, getState()), {
      fileName: (payload.data.fileNames || payload.data.files).map((i) => i.name),
      ...processParams(getState().content.userData, payload.params, undefined, getState()),
    });
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
      getState,
    });
  }
  let finalObj = {};
  if (payload.defaultResponse && payload.defaultResponse[response.status]) {
    if (Array.isArray(payload.defaultResponse[response.status])) {
      console.log(payload.defaultResponse);
      let isValid = false;
      payload.defaultResponse[response.status].forEach((item) => {
        if (item.match && !isValid) {
          const valid = new Validator(item.match);
          valid.setValues(getState().content.userData);
          if (valid.validateAll()) {
            finalObj = item;
            isValid = true;
          }
        }
      });
    } else {
      finalObj = payload.defaultResponse && (payload.defaultResponse[response.status] || payload.defaultResponse.error);
    }
  }
  response = object.extendData(finalObj, response);

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
    const data = payload.dataKey ? { [payload.dataKey]: response.data } : response.data;
    payload.success && payload.success(response.data);
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
    payload.failed && payload.failed(response.error);
    await dispatch(updateErrorData(response.error));
  }
  if (payload.runInit) {
    dispatch(mergeUserData(pageResponse?.pageData?.init));
  }
  if (payload.runMerge) {
    dispatch(mergeUserData(pageResponse?.pageData?.merge));
  }
  if (payload.after) {
    dispatch(checkAndPostApi(payload.after, pageResponse, payload));
  }

  return response;
};

export const downloadApi = (payload, pageResponse) => async (dispatch, getState) => {
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
        params: processParams(getState().content.userData, payload.params, undefined, getState()),
        headers: processParams(getState().content.userData, payload.headers, undefined, getState()),
        query: processParams(getState().content.userData, payload.query, undefined, getState()),
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
    paramToProcess = processParams(getState().content.userData, paramToProcess, undefined, getState());
    const method = paramToProcess.method || 'get';
    await apiBridge[method](paramToProcess.href || paramToProcess.url, processParams(getState().content.userData, payload.params, undefined, getState()), processParams(getState().content.userData, payload.headers, undefined, getState()), processParams(getState().content.userData, payload.query, undefined, getState()), { plain: true })
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
        const strip = newurl.indexOf('?') > -1 ? newurl.indexOf('?') : newurl.length;
        const exactUrl = newurl.substr(0, strip);
        const fileName = exactUrl.substr(exactUrl.lastIndexOf('/') + 1) || 'no-name';
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
        params: processParams(getState().content.userData, payload.params, undefined, getState()),
        headers: processParams(getState().content.userData, payload.headers, undefined, getState()),
        query: processParams(getState().content.userData, payload.query, undefined, getState()),
      },
      userData: getState().content.userData,
      dispatch,
      getState,
    });
  }

  let finalObj = {};
  if (payload.defaultResponse && payload.defaultResponse[response.status]) {
    if (Array.isArray(payload.defaultResponse[response.status])) {
      console.log(payload.defaultResponse);
      let isValid = false;
      payload.defaultResponse[response.status].forEach((item) => {
        if (item.match && !isValid) {
          const valid = new Validator(item.match);
          valid.setValues(getState().content.userData);
          if (valid.validateAll()) {
            finalObj = item;
            isValid = true;
          }
        }
      });
    } else {
      finalObj = payload.defaultResponse && (payload.defaultResponse[response.status] || payload.defaultResponse.error);
    }
  }
  response = object.extendData(finalObj, response);

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
  if (payload.runInit) {
    dispatch(mergeUserData(pageResponse?.pageData?.init));
  }
  if (payload.runMerge) {
    dispatch(mergeUserData(pageResponse?.pageData?.merge));
  }
  if (payload.after) {
    dispatch(checkAndPostApi(payload.after, pageResponse, payload));
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
    clearWithFilter: (state, action) => {
      let data = {};
      if (action.payload.keys) {
        action.payload.keys.forEach((key) => {
          data[key] = undefined;
        });
      }
      state.userData = {
        ...state.userData,
        ...data,
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
    case 'keys':
      dispatch(content.actions.clearWithFilter({ keys: payload.keys }));
      break;
    case 'except':
      dispatch(content.actions.clearWithFilter({ except: payload.except }));
      break;
  }
};

export const { updateProtectedUserData, updateUserData, clearAllUserData, clearWithFilter, updateMetaData } = content.actions;
export { customHooks };
export default content.reducer;
