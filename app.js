var express = require ('express');
var session = require ('express-session');
var cookie =require('cookie-parser');
var path = require('path');
var ejs = require('ejs');
var multer = require('multer');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var expressValidator = require('express-validator');
var sweetalert = require('sweetalert2');
var bodyParser = require('body-parser');
const http =require('http');
var db =require('./models/db_controller');
var signup = require('./controller/signup');
var login = require('./controller/login');
var verify = require('./controller/verify');
var reset = require('./controller/reset_controller');
var doctors = require('./controller/doc_controller');
var employee = require('./controller/employee');
var app = express();

app.set('view engine','ejs');
const server =http.createServer(app);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookie());
const PORT = process.env.PORT || 4000;
server.listen(PORT, function () {
    console.log(`server running on port ${PORT}`); // Use backticks for template literals
});


app.use('/signup',signup);
app.use('/login',login);
app.use('/verify',verify);
app.use('/reset',reset);
app.use('/doctor',doctors);
