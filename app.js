var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var generate_uid = require('./routes/generate_uid');
var user = require('./routes/user');
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
     res.locals.connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'snowapp',
      password : 'snowapp',
      database : 'snowapp'
    });
    res.locals.connection.connect();

    res.locals.connection.query('CREATE TABLE IF NOT EXISTS incidents(id INT NOT NULL AUTO_INCREMENT,PRIMARY KEY(id), caller VARCHAR(50) NOT NULL ,state VARCHAR(20),description  VARCHAR(100) )', function (err)
   {  if (err) throw err; });
   res.locals.connection.query('CREATE TABLE IF NOT EXISTS user ( id smallint unsigned not null auto_increment, username varchar(50) not null, email varchar(50) not null, password varchar(50) not null,constraint pk_example primary key (id) )', function (err)
   { if (err) throw err; });
    next();  
  });

app.use('/api/v1/user', user);
app.use('/api/v1/generate_uid', generate_uid);



module.exports = app;