import { createSlice } from '@reduxjs/toolkit';
import adminConfig from '../../admin.config';
import { CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import { showNotificationMessage, startLoading } from '../common';
import { processParams, selectUserData, customHooks } from '../content';
const initialState = {};
const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setContentPage: (state, action) => {
      state.contentData = action.payload;
    },
    setContentPages: (state, action) => {
      state.contentPages = action.payload;
    },
    setFieldsMeta: (state, action) => {
      state.fieldsMeta = action.payload;
    },
    setContentTree: (state, action) => {
      state.contentTree = action.payload;
    },
    setRoot: (state, action) => {
      state.root = action.payload;
    },
  },
});

export const getPage =
  (payload, { url, method = 'post', params, hook, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](url || adminConfig.apis.getPage, params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload, undefined, processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState()));
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPage(result.data));
    }
  };
export const getFieldsMeta =
  (payload, { url, method = 'post', params, query, hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](url || adminConfig.apis.getFieldsMeta, params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload, undefined, processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState()));
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setFieldsMeta(result.data));
    }
  };

export const loadPageTree =
  (payload, { url, method = 'post', params, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](url || adminConfig.apis.getContentTree, params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload, undefined, processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState()));
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(setContentTree(result.data));
      await dispatch(
        loadPagesByPath({
          parentPath: result.data.path,
        })
      );
    }
  };

export const loadPagesByPath =
  (payload, { url, method = 'post', params, hook, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](url || adminConfig.apis.getPageByPath, params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload, undefined, processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState()));
    console.log('>>>>', hook);
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPages(result.data.pages));
    }
  };

export const savePageDraft =
  (payload, { url, method = 'patch', params, hook, autoSave, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](url || adminConfig.apis.contentPage, params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()), ...payload }, params, undefined, getState()) : payload, undefined, processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState()));
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      !autoSave &&
        dispatch(
          showNotificationMessage({
            message: 'Page saved successfully',
          })
        );
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPage(result.data));
    }
  };
export const selectContentData = (state) => {
  return state.admin.contentData;
};

export const { setRoot, setContentPage, setContentTree, setContentPages, setFieldsMeta } = admin.actions;

export default admin.reducer;
