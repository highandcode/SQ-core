import { createAsyncAction } from './redux-actions';

export const create = ({
  fetchContentPage = {
    data: {
      pageData: {},
    },
  },
  postApi = {
    status: 'success',
    statusCode: 200,
    data: {},
  },
} = {}) => {
  return {
    fetchContentPage: createAsyncAction(fetchContentPage),
    postApi: jest.fn(() => Promise.resolve(postApi)),
    updateUserData: jest.fn(),
    mergeUserData: jest.fn(),
  };
};
