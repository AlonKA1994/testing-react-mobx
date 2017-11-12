// LogModel.js

var LogModel = function (data) {
    this.data = data;
    this.data.id = Date.now();
};

LogModel.prototype.data = {}

LogModel.prototype.get = function (name) {
    return this.data[name];
}

LogModel.prototype.set = function (name, value) {
    this.data[name] = value;
}
module.exports = LogModel;
