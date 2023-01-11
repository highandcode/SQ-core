import { createSlice } from '@reduxjs/toolkit';
import { updateUserData, updateProtectedUserData, customHooks } from '../content';
import { CONSTANTS } from '../../globals';
import * as utils from '../../utils';
import adminConfig from '../../admin.config';
// import { showNotificationMessage } from '../common';
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
    console.log(response, ' >>>');
    return response;
  },
  loadUserProfile: async (response, { dispatch }) => {
    dispatch(loadUserProfile());
  },
});
export const loadUserProfile = () => async (dispatch) => {
  // console.log(getState().content.userData);
  const response = await utils.apiBridge.get(adminConfig.apis.userInfo, {});
  if (response.status !== CONSTANTS.STATUS.SUCCESS) {
    utils.cookie.remove('qjs-token');
    await dispatch(clearUser());
    await dispatch(
      updateProtectedUserData({
        currentUser: undefined,
        currentUserPreference: undefined,
      })
    );
  } else if (response.statusCode === 500) {
    await dispatch(
      showNotificationMessage({
        message: 'Unauthorized',
        type: 'error',
      })
    );
    utils.cookie.remove('qjs-token');
    await dispatch(clearUser());
    await dispatch(
      updateProtectedUserData({
        currentUser: undefined,
        currentUserPreference: undefined,
      })
    );
  } else {
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

export const { setUser, setPreference } = authentication.actions;

export default authentication.reducer;
