
module.exports = (conn) => {
  return conn.model('AdminDBVersion', {
    version: String
  }, 'admin-dbversion');
}