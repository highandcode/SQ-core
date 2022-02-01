function Response(data, status) {
  this.status = status || Response.TYPES.SUCCESS;
  this.data = data;
  this.code = data.code || (this.status === Response.TYPES.ERROR ? 500 : 200);
}
Response.TYPES = {
  ERROR: 'error',
  SUCCESS: 'success'
};
Response.prototype.json = function () {
  var dataProp = this.status === Response.TYPES.ERROR ? Response.TYPES.ERROR : 'data';
  return {
    status: this.status,
    statusCode: this.code,
    [dataProp]: this.data
  };
};

Response.prototype.success = function () {
  this.status = Response.TYPES.SUCCESS;
  this.code = this.data.code || this.code || 200;
  return this.json();
};

Response.prototype.error = function () {
  this.status = Response.TYPES.ERROR;
  this.code = this.data.code || this.code || 500;
  return this.json();
};

module.exports = Response;
