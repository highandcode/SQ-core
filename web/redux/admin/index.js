import { createSlice } from '@reduxjs/toolkit';
import adminConfig from '../../admin.config';
import { CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import { showNotificationMessage, startLoading } from '../common';
import { processParams, selectUserData, customHooks } from '../content';
const initialState = {
  contentData: {
    pageData: {
      title: 'Untitled Page',
    },
  },
};
const admin = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.media = action.payload;
    },
    setMediaPage: (state, action) => {
      state.mediaPage = action.payload;
    },
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
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.getPage,
      params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload,
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPage(result.data));
    }
  };
export const createPage =
  (payload, { url, method = 'post', params, hook, query } = {}) =>
  async (dispatch, getState) => {
    await dispatch(setContentPage(initialState.contentData));
  };
export const getFieldsMeta =
  (payload, { url, method = 'post', params, query, hook } = {}) =>
  async (dispatch, getState) => {
    if (url && method) {
      const result = await utils.apiBridge[method](
        url,
        params
          ? processParams(
              {
                ...selectContentData(getState()),
                ...selectUserData(getState()),
              },
              params,
              undefined,
              getState()
            )
          : payload,
        undefined,
        processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
      );
      if (result.status === CONSTANTS.STATUS.SUCCESS) {
        if (hook) {
          result.data = await customHooks.execute(hook, result);
        }
        await dispatch(setFieldsMeta(result.data));
      }
    }
  };

export const loadPageTree =
  (payload, { url, method = 'post', params, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.getContentTree,
      params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload,
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
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
  (payload, { url, method = 'post', params, hook, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.getPageByPath,
      params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, params, undefined, getState()) : payload,
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPages(result.data.pages));
    }
  };

export const copyMediaLink = (payload) => async (dispatch, getState) => {
  navigator.clipboard.writeText(payload);
  dispatch(
    showNotificationMessage({
      message: 'Media link has been copied.',
      type: 'success',
    })
  );
};

export const deleteLink =
  (payload, { url, params, method = 'delete', hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.deleteMedia,
      params
        ? processParams(
            {
              ...selectContentData(getState()),
              ...selectUserData(getState()),
              ...payload,
            },
            params,
            undefined,
            getState()
          )
        : payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(
        showNotificationMessage({
          message: 'Media link has been deleted.',
          type: 'success',
        })
      );
      return;
    }
  };

export const updateMedia =
  (payload, { url, params, method = 'patch', hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.updateMedia,
      params
        ? processParams(
            {
              ...selectContentData(getState()),
              ...selectUserData(getState()),
              ...payload,
            },
            params,
            undefined,
            getState()
          )
        : payload
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(
        showNotificationMessage({
          message: 'Media updated successfully.',
          type: 'success',
        })
      );
      return;
    }
  };

export const uploadMedia =
  (payload, { url, params, hook } = {}) =>
  async (dispatch, getState) => {
    let response = {};
    if (payload.data) {
      const formData = new FormData();
      payload.data.files.forEach((file) => {
        formData.append('file', file);
      });
      response.status = 'success';
      response.data = {};
      const fileName = payload.data.files[0].name.split(' ').join('_');
      const contentType = {
        contentType: 'VIDEO',
      };
      if (!fileName.includes('.mp4')) {
        delete contentType['contentType'];
      }
      const result = await utils.apiBridge.rawPost(
        url || adminConfig.apis.uploadMedia,
        formData,
        {},
        {
          fileName: fileName,
          ...(params
            ? processParams(
                {
                  ...selectContentData(getState()),
                  ...selectUserData(getState()),
                },
                params,
                undefined,
                getState()
              )
            : {}),
          ...contentType,
        }
      );

      if (result.status === CONSTANTS.STATUS.SUCCESS) {
        if (hook) {
          result.data = await customHooks.execute(hook, result);
        }
        dispatch(
          showNotificationMessage({
            message: 'Uploaded file successfyully',
          })
        );
        payload.success(result.data.files);
      } else {
        dispatch(
          showNotificationMessage({
            message: 'Upload media failed',
            type: 'error',
          })
        );
      }
    }
  };

export const loadMedia =
  ({ body, query } = {}, { url, method = 'post', params, hook } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.searchMedia,
      params ? processParams({ ...selectContentData(getState()), ...selectUserData(getState()), ...body }, params, undefined, getState()) : body,
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      const pageData = {
        pageSize: result.data.pageSize,
        currentPage: result.data.currentPage,
        isFirst: result.data.first,
        isLast: result.data.last,
        totalPages: result.data.totalPages,
      };
      await dispatch(setMedia(result.data.data));
      await dispatch(setMediaPage(pageData));
    }
  };

export const savePageDraft =
  (payload, { url, method = 'patch', params, hook, autoSave, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.contentPage,
      params
        ? processParams(
            {
              ...selectContentData(getState()),
              ...selectUserData(getState()),
              ...payload,
            },
            params,
            undefined,
            getState()
          )
        : payload,
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
    );
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
export const deletePage =
  (payload, { url, method = 'delete', params, hook, query } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.contentPage,
      params
        ? processParams(
            {
              ...selectContentData(getState()),
              ...selectUserData(getState()),
              ...payload,
            },
            params,
            undefined,
            getState()
          )
        : { uid: payload.uid },
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      dispatch(
        showNotificationMessage({
          message: 'Page deleted successfully',
        })
      );
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPage(result.data));
    }
  };
export const clonePage =
  (payload, { url, method = 'post', params, hook, query } = {}, { success, error } = {}) =>
  async (dispatch, getState) => {
    const result = await utils.apiBridge[method](
      url || adminConfig.apis.clonePage,
      params
        ? processParams(
            {
              ...selectContentData(getState()),
              ...selectUserData(getState()),
              ...payload,
            },
            params,
            undefined,
            getState()
          )
        : { from: payload.from, to: payload.to, type: payload.type },
      undefined,
      processParams({ ...selectContentData(getState()), ...selectUserData(getState()) }, query, undefined, getState())
    );
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      dispatch(
        showNotificationMessage({
          message: 'Page cloned successfully',
        })
      );
      if (hook) {
        result.data = await customHooks.execute(hook, result);
      }
      await dispatch(setContentPage(result.data));
      success && success(result);
    } else {
      error && error(result);
    }
  };
export const selectContentData = (state) => {
  return state.admin.contentData;
};

customHooks.add('admin', {
  afterPageCreate: (result, { dispatch }) => {
    if (result.status === CONSTANTS.STATUS.SUCCESS) {
      switch (result.data.type) {
        case CONSTANTS.contentType.PAGE:
          utils.redirect.redirectTo('editPage', { path: result.data.path });
          break;
        case CONSTANTS.contentType.SITE_MAP:
          utils.redirect.redirectTo('editSiteMap', { path: result.data.path });
          break;
      }
    }
    return result;
  },
});

export const { setRoot, setContentPage, setContentTree, setContentPages, setFieldsMeta, setMedia, setMediaPage } = admin.actions;

export default admin.reducer;
