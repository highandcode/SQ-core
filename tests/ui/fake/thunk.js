const thunkMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  };
const create = (prevState = {}) => {
  const next = jest.fn();
  const store = {
    getState: jest.fn(() => prevState),
    dispatch: jest.fn((action) => thunkMiddleware(store)(next)(action)),
  };

  const invoke = (action) => thunkMiddleware(store)(next)(action);

  return { store, next, invoke };
};
export { thunkMiddleware, create };
