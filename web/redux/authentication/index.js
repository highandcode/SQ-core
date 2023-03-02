import { createSlice } from '@reduxjs/toolkit';
import {
  processParams,
  selectUserData,
  updateUserData,
  updateProtectedUserData,
  customHooks,
} from '../content';
import _ from 'lodash';
import { GLOBAL_OPTIONS, CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import domain from '../../domain';
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
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    clearAddUserError: (state) => {
      state.currentUserError = {};
    },
    updateCurrentRolePermissions: (state, action) => {
      state.currentRole.allPermissions = {
        ...state.currentRole.allPermissions,
        [action.payload.key]: action.payload.data,
      };
    },
    setRoleUsers: (state, action) => {
      state.currentRoleUsers = action.payload;
    },
    setAddUserError: (state, action) => {
      state.currentUserError = {
        error: true,
        errorMessage: action.payload,
      };
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

export const showAllRoles =
  (payload, { url }) =>
  async (dispatch) => {
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

export const removeUserToRole =
  (payload, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.delete(
      url || adminConfig.apis.roleMapping,
      payload
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(
        showNotificationMessage({
          message: 'User removed successfully',
          type: 'success',
        })
      );
    }
  };

export const removeRole =
  (payload, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.delete(
      url || adminConfig.apis.userRoles,
      payload
    );
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
const populateFullName = (data) => {
  return data.map((i) => {
    return {
      ...i,
      fullName: `${i.firstName} ${i.lastName}`,
      displayName: `${i.firstName} ${i.lastName} (${i.emailId})`,
    };
  });
};

export const loadUsers =
  (payload, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.post(
      url || adminConfig.apis.searchUsers,
      { ...payload.body },
      {},
      payload.query
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      const pagination = {
        total: response.data?.totalItems,
        pageSize: response.data.pageSize,
        currentPage: response.data.currentPage,
        isLast: response.data.last,
        totalPages: response.data.totalPages,
      };
      response.data.data = populateFullName(response.data.data);
      await dispatch(setUsers(response.data.data));
      await dispatch(setUserPagination(pagination));
    }
  };

export const loadUsersByRole =
  (payload, { url } = {}) =>
  async (dispatch, getState) => {
    const response = await utils.apiBridge.get(
      url || adminConfig.apis.getUsersByRole,
      {
        roleCode: payload.roleCode,
      }
    );
    dispatch(setRoleUsers(response.data));
  };
export const loadAllUsers = (payload) => async (dispatch, getState) => {
  const response = await utils.apiBridge.get(
    adminConfig.apis.getUsersByRole,
    { ...payload.body },
    {},
    payload.query
  );
  dispatch(setRoleUsers(response.data));
};
export const getProperty = (payload) => async (dispatch, getState) => {
  const response = await utils.apiBridge.post(
    adminConfig.apis.getPropertyList,
    { ...payload.body },
    {},
    payload.query
  );
  dispatch(setUsers(response.data));
};
export const addUserToRole =
  (payload, { url } = {}) =>
  async (dispatch, getState) => {
    const response = await utils.apiBridge.post(
      url || adminConfig.apis.roleMapping,
      payload
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(
        showNotificationMessage({
          message: 'User added saved successfully',
          type: 'success',
        })
      );
    } else if (response.validationError?.key === 'CODE_IS_DUPLICATE') {
      await dispatch(setAddUserError('User already exists'));
    }
  };

export const savePermissionMapping =
  (payload, { url } = {}) =>
  async (dispatch, getState) => {
    const response = await utils.apiBridge.post(
      url || adminConfig.apis.savePermissionByRole,
      payload
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(
        showNotificationMessage({
          message: 'Permssions saved successfully',
          type: 'success',
        })
      );
      await dispatch(loadUserProfile());
      utils.redirect.redirectTo('viewRoles');
    } else {
      await dispatch(
        showNotificationMessage({
          message: 'Something went wrong',
          type: 'error',
        })
      );
    }
  };
export const loadPermissions =
  (payload, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.get(
      url || adminConfig.apis.getAllPermissions,
      {}
    );
    let filterable = new domain.collection.Filterable(response.data);
    const obj = {
      [GLOBAL_OPTIONS.permissionTypes.keys.PERMISSIONS]: _.groupBy(
        filterable
          .filterBy({
            groupTypeCode: GLOBAL_OPTIONS.permissionTypes.keys.PERMISSIONS,
          })
          .toArray(),
        'groupName'
      ),
      [GLOBAL_OPTIONS.permissionTypes.keys.LEFT_NAVIGATION]: _.groupBy(
        filterable
          .filterBy({
            groupTypeCode: GLOBAL_OPTIONS.permissionTypes.keys.LEFT_NAVIGATION,
          })
          .toArray(),
        'groupName'
      ),
    };
    dispatch(setPermissions(obj));
  };

export const getPermissionsByRole =
  (roleCode, { url } = {}) =>
  async (dispatch) => {
    const response = await utils.apiBridge.post(
      url || adminConfig.apis.searchPermissionsMapping,
      {
        roleCode,
      }
    );

    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      let dataObj = { ...response.data };
      dataObj.allPermissions = {};
      response.data?.permission &&
        response.data.permission.forEach((perm) => {
          const uniQKey = `${perm.groupTypeCode}_${perm.groupName}`;
          if (dataObj.allPermissions[uniQKey]) {
            dataObj.allPermissions[uniQKey].push(perm.code);
          } else {
            dataObj.allPermissions[uniQKey] = [perm.code];
          }
        });
      dispatch(setCurrentRole(dataObj));
    } else {
      dispatch(
        showNotificationMessage({
          message: 'Failed to get permissions',
          type: 'error',
        })
      );
    }
  };

export const deactivateUser =
  (payload, config = {}) =>
  async (dispatch, getState) => {
    const { url } = processParams({...selectUserData(getState()), ...payload}, config)
    const response = await utils.apiBridge.patch(
      url || `${adminConfig.apis.user}/${payload.emailId}/deactivate`
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(
        showNotificationMessage({
          message: 'User deactivate successfully',
          type: 'success',
        })
      );
    }
  };

export const reactivateUser =
  (payload, config = {}) =>
  async (dispatch, getState) => {
    const { url } = processParams({...selectUserData(getState()), ...payload}, config)
    const response = await utils.apiBridge.patch(
      url || `${adminConfig.apis.user}/${payload.emailId}/activate`
    );
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      await dispatch(
        showNotificationMessage({
          message: 'User activate successfully',
          type: 'success',
        })
      );
    }
  };

export const resetPassword = (payload, config = {}) => async (dispatch, getState) => {
  const { url } = processParams({...selectUserData(getState()), ...payload}, config)
  const response = await utils.apiBridge.patch(
    url || `${adminConfig.apis.user}/${payload.emailId}/resetPassword`
  );
  if (response.status === CONSTANTS.STATUS.SUCCESS) {
    await dispatch(
      showNotificationMessage({
        message: 'Password reset completed successfully.',
        type: 'success',
      })
    );
  }
};

export const {
  setUser,
  setRoles,
  setUsers,
  setUserPagination,
  setPreference,
  setAllRoles,
  setAllRolesPages,
  setAddUserError,
  setCurrentRole,
  setPermissions,
  setRoleUsers,
  updateCurrentRolePermissions,
  clearAddUserError,
} = authentication.actions;

export default authentication.reducer;
