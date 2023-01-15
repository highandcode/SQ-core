import { createSlice } from '@reduxjs/toolkit';
import adminConfig from '../../admin.config';
import { CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import { showNotificationMessage } from '../common';
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
    setContentTree: (state, action) => {
      state.contentTree = action.payload;
    },
    setRoot: (state, action) => {
      state.root = action.payload;
    },
  },
});

export const getPage =
  (payload, { url, params, hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.post(
      url || adminConfig.apis.getPage,
      params ? processParams(selectUserData(getState()), params, undefined, getState()) : payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = customHooks.execute(hook, result)
      }
      await dispatch(setContentPage(result.data));
    }
  };

export const loadPageTree =
  (payload, { url, params } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.post(
      url || adminConfig.apis.getContentTree,
      params ? processParams(selectUserData(getState()), params, undefined, getState()) : payload
    );
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
  (payload, { url, params, hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.post(
      url || adminConfig.apis.getPageByPath,
      params ? processParams(selectUserData(getState()), params, undefined, getState()) : payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = customHooks.execute(hook, result);
      }
      await dispatch(setContentPages(result.data.pages));
    }
  };

export const savePageDraft =
  (payload, { url, params, hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.patch(
      url || adminConfig.apis.contentPage,
      params ? processParams({...selectUserData(getState()), ...payload}, params, undefined, getState()) : payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      dispatch(
        showNotificationMessage({
          message: 'Page saved successfully',
        })
      );
      if (hook) {
        result.data = customHooks.execute(hook, result)
      }
      await dispatch(setContentPage(result.data));
    }
  };

export const { setRoot, setContentPage, setContentTree, setContentPages } =
  admin.actions;

export default admin.reducer;
