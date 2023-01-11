import * as content from './content';
import * as common from './common';
import * as admin from './admin';
import * as authentication from './authentication';
import * as user from './user';

export { content, common, admin, authentication, user };

export default {
  content: content.default,
  common: common.default,
  admin: admin.default,
  authentication: authentication.default,
  user: user.default,
};
