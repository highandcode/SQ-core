import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  appLoaded: false,
  isLoading: false,
  error: {},
  notification: {},
  popup: {},
  popupScreen: {},
};
const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error.hasError = true;
      state.error.errorMessage = action.payload.message;
    },
    clearError: (state, action) => {
      state.error = {};
    },
    setNotification: (state, action) => {
      state.notification.message = action.payload.message;
      state.notification.type = action.payload.type;
      state.notification.show = true;
    },
    setNotificationTimeout: (state, action) => {
      state.notification.prevTimeout = action.payload;
    },
    setPopup: (state, action) => {
      state.popup.message = action.payload.message;
      state.popup.title = action.payload.title;
      state.popup.type = action.payload.type;
      state.popup.severity = action.payload.severity;
      state.popup.show = true;
    },
    closePopup: (state) => {
      state.popup.show = false;
    },
    setPopupScreen: (state, action) => {
      const { name, title, dialogProps = {}, ...props } = action.payload;
      state.popupScreen.name = name;
      state.popupScreen.title = title;
      state.popupScreen.dialogProps = dialogProps;
      state.popupScreen.props = props;
      state.popupScreen.show = true;
    },
    closePopupScreen: (state) => {
      state.popupScreen.show = false;
    },
    setCloseNotification: (state) => {
      state.notification.show = false;
    },
  },
});

export const {
  setAppLoaded,
  setNotification,
  setNotificationTimeout,
  startLoading,
  stopLoading,
  setError,
  closePopup,
  clearError,
  closePopupScreen,
} = common.actions;

export const selectCurrentNotification = (state) => state.common.notification;

export const showNotificationMessage =
  (payload) => async (dispatch, getState) => {
    const { timeout = 3000 } = payload;
    const currentNotification = selectCurrentNotification(getState());
    currentNotification.prevTimeout &&
      clearTimeout(currentNotification.prevTimeout);
    await dispatch(setNotificationTimeout(null));
    await dispatch(setNotification(payload));
    const nextTimeout = setTimeout(() => {
      dispatch(closeNotification());
      payload.callback && payload.callback();
    }, timeout);
    await dispatch(setNotificationTimeout(nextTimeout));
  };
export const closeNotification = () => (dispatch, getState) => {
  const currentNotification = selectCurrentNotification(getState());
  currentNotification.prevTimeout &&
    clearTimeout(currentNotification.prevTimeout);
  dispatch(common.actions.setCloseNotification());
};

export const showPopup = (payload) => async (dispatch) => {
  await dispatch(common.actions.setPopup(payload));
};
export const showPopupScreen = (payload) => async (dispatch) => {
  await dispatch(common.actions.setPopupScreen(payload));
};

export default common.reducer;
