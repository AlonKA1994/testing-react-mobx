var LogModel         = require('../models/LogModel');

module.exports = function LogService() {

    this.getAllLogs = function () {
        return LogModel.find();
    };

    this.insertNewLog = function (newLog) {
        let tmpLog = new LogModel();

        tmpLog.strLogName = newLog.strLogName;
        tmpLog.strLogPath = newLog.strLogPath;
        tmpLog.bLogContinued = newLog.bLogContinued;
        tmpLog.arrRegExp = newLog.arrRegExp;

        return tmpLog.save();
    };
    
    this.updateLog = function (id, updatedLog) {
        let condition = { _id : id };

        return LogModel.update(condition, updatedLog).exec();
    };

    this.deleteLog = function (id) {
        let condition = { _id : id };

        return LogModel.remove(condition).exec();
    };
};