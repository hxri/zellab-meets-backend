//import express
const express = require('express');


//define an express app
const app = express();
const port = process.env.PORT || 8080 ;


// parse requests
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


// routes
require('./routes/meet.routes.js')(app);


// database
const dbConfig = require('./config/meet.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the DB");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// start the server
app.listen(port, () => {
    console.log('Running server on port ' + port)
});