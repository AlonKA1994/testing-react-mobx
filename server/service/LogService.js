var Log         = require('../models/Logs');

module.exports = function LogService() {

    this.getAllLogs = function () {
        return Log.find();
    };

    this.insertNewLog = function (newLog) {
        let tmpLog = new Log();

        tmpLog.strLogName = newLog.strLogName;
        tmpLog.strLogPath = newLog.strLogPath;
        tmpLog.bLogContinued = newLog.bLogContinued;
        tmpLog.arrRegExp = newLog.arrRegExp;

        return tmpLog.save();
    };
    
    this.updateLog = function (id, updatedLog) {
        let condition = { _id : id };

        return Log.update(condition, updatedLog).exec();
    };

    this.deleteLog = function (id) {
        let condition = { _id : id };

        return Log.remove(condition).exec();
    };
};