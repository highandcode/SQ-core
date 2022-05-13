import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as utils from '../../utils';
import CustomModule from '../../utils/custom-module';
const { queryString, apiBridge, object, common } = utils;
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
  isContentLoading: false,
};
export const customHooks = new CustomModule();

const extendData = (org, update) => {
  let obj = {
    ...org,
  };
  Object.keys(update).forEach((a) => {
    if (!Array.isArray(update[a]) && typeof update[a] === 'object') {
      obj[a] = extendData(obj[a], update[a]);
    } else {
      obj[a] = update[a];
    }
  });
  return obj;
};

const processParams = (state, params = {}, defaultValue = null) => {
  const newObj = {};
  Object.keys(params).forEach((key) => {
    let value;
    if (typeof params[key] === 'object') {
      value = processParams(state, params[key], defaultValue);
    } else if (params[key].toString().substr(0, 1) === '.') {
      value = object.getDataFromKey(state, params[key].substr(1), defaultValue);
    } else if (!common.isNullOrUndefined(params[key])) {
      value = params[key];
    }
    if (!common.isNullOrUndefined(value)) {
      newObj[key] = value;
    }
  });
  return newObj;
};

export const fetchContentPage = createAsyncThunk(
  'content/fetchContentPage',
  async (url) => {
    const fullUrl = url || location.href;

    const response = await apiBridge.post(fullUrl);
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
  if (Array.isArray(data)) {
    data.forEach((item) => {
      dispatch(postApi(item));
    });
  } else {
    dispatch(postApi(data));
  }
};

export const postApi = (payload) => async (dispatch, getState) => {
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
      payload,
      userData: getState().content.userData,
      dispatch,
    });
  }
  if (payload.method && payload.url) {
    response = await apiBridge[payload.method.toLowerCase()](
      payload.url,
      processParams(getState().content.userData, payload.params),
      payload.headers
    );
  }

  if (payload.postHook) {
    response = await customHooks.execute(payload.postHook, response, {
      payload,
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
    await dispatch(
      updateUserData({
        ...response.data,
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

    clearAllUserData: (state) => {
      state.userData = {
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
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(fetchContentPage.pending, (state) => {
    //       console.log('@fetch', state);
    //       state.isContentLoading = true;
    //     })
    //     .addCase(fetchContentPage.fulfilled, (state, action) => {
    //       state.isContentLoading = false;
    //     });
    // },
  },
});

export const resetLastError = () => (dispatch) => {
  dispatch(
    updateUserData({
      lastError: {},
    })
  );
};

export const mergeUserData = (payload) => (dispatch, getState) => {
  const data = processParams(getState().content.userData, payload, '');
  const merged = extendData(getState().content.userData, data);
  dispatch(updateUserData(merged));
};
export const resetUserData = (payload) => (dispatch, getState) => {
  switch (payload.type) {
    case 'clearAll':
      dispatch(content.actions.clearAllUserData());
      break;
  }
};

export const { updatePageData, updateUserData } = content.actions;
export default content.reducer;
