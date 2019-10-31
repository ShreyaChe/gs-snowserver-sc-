var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var generate_uid = require('./routes/generate_uid');
var user = require('./routes/user');
var incidents = require('./routes/incidents');
process.on('uncaughtException', function (err)

{
	console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
	console.error(err.stack);
	process.exit(1);

});



/* handle an unhandled promise rejection */

process.on('unhandledRejection', function (reason, promise)

{
console.error('unhandled rejection:', reason.message || reason);
})
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
var mysql = require("mysql");

//Database connection
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();  
  });

app.use('/api/v1/user', user);
app.use('/api/v1/incidents', incidents);
app.use('/api/v1/generate_uid', generate_uid);



module.exports = app;