var mysql =require('mysql');
var express =require('express');
var router =express.Router();
var bodyParser =require('body-parser');

var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hmsystems',
    port:3306,
});
 
con.connect(function(err){
    if(err){
        throw err;
    }else{
        console.log('You are connected to database')
    }
});

module.exports.signup = function(username,email,password,status,callback){
    console.log('signup: ');
    con.query('SELECT email FROM users WHERE email =\''+ email +'\'');

    var query = "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES('"+username+"','"+email+"','"+password+"','"+status+"')"

    con.query(query, callback)
}

module.exports.verify = function(username,email,token,callback){
    var query ="insert into `verify`(`username`,`email`,`token`) VALUES('"+username+"','"+email+"','"+token+"') "
    con.query(query,callback)
}

module.exports.verify1 = function(email,callback){
    var query ="select *from `verify` where email ='" + email + "'"
    con.query(query,callback)
}

module.exports.getuserid = function (email, callback) {
    const query = 'SELECT id FROM `verify` WHERE token = \''+token+'\'';
    con.query(query, callback);
};

module.exports.matchtoken = function (id,token, callback) {
    const query = "SELECT id FROM `verify` WHERE token = \''+token+'\'' and "+id;
    con.query(query, callback);
    console.log(query);
};

module.exports.updateverify = function (email,email_status, callback) {
    const query = "update `users` set `email_status` = '"+email_status+"' WHERE `email` = '"+email_status+"'";
    con.query(query, callback);
    console.log(query);
};