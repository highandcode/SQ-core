import { createSlice } from '@reduxjs/toolkit';
import {
  updateUserData,
  updateProtectedUserData,
  customHooks,
} from '../content';
import { GLOBAL_OPTIONS, CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import adminConfig from '../../admin.config';
import { showNotificationMessage } from '../common';
const initialState = {
  currentUser: null,
};

const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setAllRoles: (state, action) => {
      state.allRoles = action.payload;
    },
    setAllRolesPages: (state, action) => {
      state.allRolesPages = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setUserPagination: (state, action) => {
      state.usersPagination = action.payload;
    },
    setPreference: (state, action) => {
      state.currentUserPreference = action.payload;
    },
  },
});

customHooks.add('authentication', {
  login: async (response, { payload, dispatch, state }) => {
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      if (response.data.token) {
        utils.cookie.add('qjs-token', response.data.token);
        utils.apiBridge.addHeader('qjs-token', `${response.data.token}`);
      }
      await dispatch(setUser(response.data));
      await dispatch(updateProtectedUserData({ currentUser: response.data }));

      await dispatch(loadUserProfile());
      const returnUrl = utils.queryString.query.get().returnUrl;
      if (returnUrl) {
        utils.redirect.redirectTo(returnUrl);
        return response;
      }
      utils.redirect.redirectTo('adminDashboard');
    }
    return response;
  },
  loadUserProfile: async (response, { dispatch }) => {
    dispatch(loadUserProfile());
  },
});
export const loadUserProfile = () => async (dispatch) => {
  // console.log(getState().content.userData);
  const response = await utils.apiBridge.get(adminConfig.apis.userInfo, {});
  if (
    response.status !== CONSTANTS.STATUS.SUCCESS &&
    utils.cookie.get('qjs-token')
  ) {
    utils.cookie.remove('qjs-token');
    await dispatch(
      showNotificationMessage({
        message: response.error.errorMessage || 'Unauthorized',
        type: 'error',
      })
    );
    await dispatch(clearUser());
    await dispatch(
      updateProtectedUserData({
        currentUser: undefined,
        currentUserPreference: undefined,
      })
    );
  } else if (response.status === CONSTANTS.STATUS.SUCCESS) {
    response.data.userInfo.roles = response.data.permissions
      ? _.uniq(response.data.permissions.map((a) => a.roleCode))
      : [];
    response.data.userInfo.allPermissions = response.data.permissions
      ? response.data.permissions
          .reduce((a, b) => {
            return a.concat(b.permission);
          }, [])
          .map((a) => a.code)
      : [];
    await dispatch(setUser(response.data.userInfo));
    await dispatch(setPreference(response.data.preference));
    await dispatch(
      updateProtectedUserData({
        currentUser: response.data.userInfo,
        currentUserPreference: response.data.preference,
      })
    );
  }
};

export const clearUser = () => (dispatch) => {
  utils.cookie.remove('qjs-token');
  utils.apiBridge.removeHeader('qjs-token');
  setTimeout(() => {
    dispatch(setUser(null));
    dispatch(
      updateProtectedUserData({
        currentUser: null,
        currentUserPreference: null,
      })
    );
  }, 200);
};

export const loadRoles =
  (payload = {}, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.get(
      url || adminConfig.apis.userRoles,
      payload
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      dispatch(
        setRoles({
          [GLOBAL_OPTIONS.roleTabs.keys.ALL_ROLES]: response.data,
        })
      );
    }
  };

export const showAllRoles = (payload, { url }) => async (dispatch) => {
  const response = await utils.apiBridge.post(
    url || adminConfig.apis.searchRole,
    { ...payload.body },
    {},
    payload.query
  );
  if (response.status === CONSTANTS.STATUS.SUCCESS) {
    const data = {
      [GLOBAL_OPTIONS.roleTabs.keys.ALL_ROLES]: response.data,
    };
    const pageData = {
      total: response.data?.totalItems,
      pageSize: response.data.pageSize,
      currentPage: response.data.currentPage,
      isLast: response.data.last,
      totalPages: response.data.totalPages,
    };
    await dispatch(setAllRoles(data));
    await dispatch(setAllRolesPages(pageData));
  }
};

export const removeUserToRole = (payload, {url} = {}) => async (dispatch) => {
  const response = await utils.apiBridge.delete(url || adminConfig.apis.roleMapping, payload);
  if (response.status === CONSTANTS.STATUS.SUCCESS) {
    await dispatch(
      showNotificationMessage({
        message: 'User removed successfully',
        type: 'success',
      })
    );
  }
};

export const removeRole = (payload, {url} = {}) => async (dispatch) => {
  const response = await utils.apiBridge.delete(url || adminConfig.apis.userRoles, payload);
  if (response.status === CONSTANTS.STATUS.SUCCESS) {
    await dispatch(
      showNotificationMessage({
        message: 'Role removed successfully',
        type: 'success',
      })
    );
  }
};
export const hasPermission = (permission, state) =>
  state?.authentication?.currentUser?.allPermissions?.indexOf(permission) > -1;
export const loadUsers =
  (payload, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.post(
      url || adminConfig.apis.searchUsers,
      { ...payload.body },
      {},
      payload.query
    );
    const pagination = {
      total: response.data?.totalItems,
      pageSize: response.data.pageSize,
      currentPage: response.data.currentPage,
      isLast: response.data.last,
      totalPages: response.data.totalPages,
    };
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      const data = {
        [payload.source]: response.data.data,
      };
      await dispatch(setUsers(response.data.data));
      await dispatch(setUserPagination(pagination));
    }
  };
export const reactivateUser = () => (dispatch) => {};
export const deactivateUser = () => (dispatch) => {};
export const resetPassword = () => (dispatch) => {};

export const { setUser, setRoles, setUsers, setUserPagination, setPreference, setAllRoles, setAllRolesPages } =
  authentication.actions;

export default authentication.reducer;
