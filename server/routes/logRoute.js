const express    = require('express');
var logService  = require('../service/LogService');

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

// on routes that end in /logs
// ----------------------------------------------------
router.route('/logs')
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    .get((req,res) => {
        // var promise = Log.getAllLogs();
        // promise
        new logService().getAllLogs()
            .then((logs) => {
                res.json(logs);
            })
            .error((err)=> {
                res.send(err);
            });
    })
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        new logService().insertNewLog(req.body.LogObject)
            .then(() => {
                res.json({ message: 'Log created!' });
            })
            .error((err) => {
                res.send(err);
            });
    });

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/logs/:log_id')
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        new logService().updateLog(req.params.log_id, req.body.LogObject)
            .then(()=>{
                res.json({ message: 'Successfully updated' });
            })
            .error((err) => {
                res.send(err);
            });
    })

    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        new logService().deleteLog(req.params.log_id)
            .then(() =>{
                res.json({ message: 'Successfully deleted' });
            })
            .error((err) =>{
                res.send(err);
            });
    });

module.exports = router;