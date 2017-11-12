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

const port = process.env.PORT || 9000;

// REGISTER OUR ROUTES -------------------------------
app.use('/api/', logRoute);
app.use('/', appRoute);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Something good is about to start at port ' + port);