const express    = require('express');
const LogModel   = require("../models/LogModel")

let arrAllLogs = [];
let tmpStart =
    new LogModel({
        strLogName: "Hello",
        strLogPath: "world!",
        bLogContinued: false,
        arrRegExp: []});
arrAllLogs.push(tmpStart.data);

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log("URL=>" + req.originalUrl + " , Method=>" + req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers,X-Requested-With");

    next(); // make sure we go to the next routes and don't stop here
});

// TODO: To think about error handling

// Methods on routes that end in /logs/
// ----------------------------------------------------
router.route('/logs')
    // get all the logs (accessed at GET http://localhost:<port>/api/logs)
    .get((req,res) => {
        res.status(200).json(arrAllLogs);
    })
    // create a log (accessed at POST http://localhost:<port>/api/logs)
    .post((req,res) =>{
        let tmpLogJson = {
            strLogName:     req.body.LogObject.strLogName,
            strLogPath:     req.body.LogObject.strLogPath,
            bLogContinued:  req.body.LogObject.bLogContinued,
            arrRegExp:      req.body.LogObject.arrRegExp
        }
        let tmpLog = new LogModel(tmpLogJson);
        arrAllLogs.push(tmpLog.data);

        res.status(200).json({message: "New log was added"});
    });

// Methods on routes that end in /logs/:log_id
// ----------------------------------------------------
router.route('/logs/:log_id')
    // get the log with that id (accessed at GET http://localhost:<port>/api/logs/:log_id)
    // Not-used -> Here for reference
    .get((req, res) => {
        let result = arrAllLogs.find((log) => log.id == req.params.log_id);

        res.json(result);
    })
    // update the log with this id (accessed at PUT http://localhost:<port>/api/logs/:log_id)
    .put((req, res) => {
        arrAllLogs = arrAllLogs.map((log) => {
            if (log.id == req.params.log_id) {
                log.strLogName    =  req.body.LogObject.strLogName;
                log.strLogPath    =  req.body.LogObject.strLogPath;
                log.bLogContinued =  req.body.LogObject.bLogContinued;
                log.arrRegExp     =  req.body.LogObject.arrRegExp;
            }
            return log;
        });

        res.status(200).json({message: "Log was updated"});
    })
    // delete the log with this id (accessed at DELETE http://localhost:<port>/api/logs/:log_id)
    .delete((req,res) => {
        arrAllLogs = arrAllLogs.filter((log) => log.id != req.params.log_id);

        res.status(200).json({message: "Log was deleted"});
    });


module.exports = router;