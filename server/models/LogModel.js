var mongoose     = require('mongoose');
mongoose.Promise = require('bluebird')
var Schema       = mongoose.Schema;

var LogSchema   = new Schema({
    strLogName: String,
    strLogPath: String,
    bLogContinued: Boolean,
    arrRegExp: Array
    },
    {
        versionKey: false
    }
);

LogSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
})


module.exports = mongoose.model('Log', LogSchema);