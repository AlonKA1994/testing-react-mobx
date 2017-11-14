'use strict';

// Call the needed packages
let express    = require('express');
let bodyParser = require('body-parser');
// Loading routes
let appRoute   = require('./routes/appRoute');
let logRoute   = require('./routes/logRoute');

let app = express();

// configure build to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//~~~~~~~~~~~~~~~~~~~~~~~~~~
var mongoose   = require('mongoose');
var options = {
    useMongoClient: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect('mongodb://127.0.0.1:27017/hafifa-db',options);

// var db = mongoose.connection;
// db.on('error', function(){
//     console.log("error");
// });
// db.once('open', function() {
//     console.log("connected");
// });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~


const port = process.env.PORT || 9000;

// REGISTER OUR ROUTES -------------------------------
app.use('/api/', logRoute);
app.use('/', appRoute);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Something good is about to start at port ' + port);