import { createSlice } from '@reduxjs/toolkit';
import adminConfig from '../../admin.config';
import { CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import { showNotificationMessage } from '../common';
const initialState = {};
const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setContentPage: (state, action) => {
      state.contentData = action.payload;
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
  (payload, { url } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.post(
      url || adminConfig.apis.getPage,
      payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(setContentPage(result.data));
    }
  };

export const loadPageTree =
  (payload, { url } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.post(
      url || adminConfig.apis.getContentTree,
      payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(setContentTree(result.data));
    }
  };

export const savePageDraft =
  (payload, { url } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge.patch(
      url || adminConfig.apis.contentPage,
      payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      dispatch(
        showNotificationMessage({
          message: 'Page saved successfully',
        })
      );
      await dispatch(setContentPage(result.data));
    }
  };

export const { setRoot, setContentPage, setContentTree } = admin.actions;

export default admin.reducer;
