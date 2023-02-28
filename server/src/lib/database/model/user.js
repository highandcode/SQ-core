
module.exports = function(conn) {
  return conn.model('User', {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    userRole: String,
    password: String,
    emailVerified: Boolean,
    phoneVerified: Boolean,
    createdOn: {
      type: Date,
      default: Date.now
    },
    updatedOn: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }, 'users')
};