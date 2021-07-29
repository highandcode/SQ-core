function Response(data, status) {
  this.status = status || 'success';
  this.data = data;
}

Response.prototype.json = function () {
  var dataProp = this.status === 'error' ? 'error' : 'data';
  return {
    status: this.status,
    [dataProp]: this.data
  };
};

Response.prototype.success = function() {
  this.status = 'success';
  return this.json();
}

Response.prototype.error = function() {
  this.status = 'error';
  return this.json();
}

module.exports = Response;