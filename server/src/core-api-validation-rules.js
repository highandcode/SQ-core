module.exports = {
  '/login': {
    POST: {
      params: {
        required: ['emailphone', 'password'],
      },
    },
  },
  '/user/info': {
    POST: {
      params: {
        required: [],
      },
    },
  },
};
