import { createAsyncAction } from './redux-actions';

export const create = ({
  fetchContentPage = {
    data: {
      pageData: {},
    },
  },
}) => {
  return {
    fetchContentPage: createAsyncAction(fetchContentPage),
    updateUserData: jest.fn(),
    mergeUserData: jest.fn(),
  };
};
