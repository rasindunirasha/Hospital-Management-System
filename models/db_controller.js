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

module.exports.matchtoken = function (id, token, callback) {
    var sql = "SELECT id FROM `verify` WHERE token = ? AND id = ?";
    con.query(sql, [token, id], function (err, result) {
        if (err) {
            console.error("Database error:", err);
            return callback(err, null);
        }
        callback(null, result);
    });
};


module.exports.updateverify = function (email,email_status, callback) {
    const query = "update `users` set `email_status` = '"+email_status+"' WHERE `email` = '"+email_status+"'";
    con.query(query, callback);
    console.log(query);
};


module.exports.findOne = function(email,callback){
    var query = "select * from users where email = '"+email+"'"
    con.query(query,callback);
    console.log(query);
}

module.exports.temp = function(id,email,token,callback){
    var query = `insert into \`temp\` (\`id\`,\`email\`,\`token\`)values('${id}","${email}","${token}")`;
    con.query(query,callback);
    console.log(query);
}

module.exports.add_doctor = function(first_name,last_name,email,dob,gender,address,phone,image,department,biography,callback){
    var query = `insert into \`doctor\` (\`first_name\`,\`last_name\`,\`email\`,\`dob\`,\`gender\`,\`address\`,\`phone\`,\`image\`,\`department\`,\`biography\`,\`callback\`)values('${first_name}","${last_name}","${email}","${dob}","${gender}","${address}","${phone}","${image}","${department}","${biography}","${callback}")`;
    con.query(query,callback);
    console.log(query);
}

module.exports.getAllDoc = function(callback){
    var query = "select * from doctor"
    con.query(query,callback);
    console.log(query);
}

module.exports.getDocbyId = function(id,callback){
    var query = "select * from doctor where id = '"+id+"'"
    con.query(query,callback);
    console.log(query);
}

module.exports.editDoc = function(first_name,last_name,email,dob,gender,address,phone,image,department,biography,callback){
    var query = `update  \`doctor\` set \`first_name\`='${first_name}",\`last_name\`="${last_name}",\`email\`="${email}",\`dob\`="${dob}",\`gender\`="${gender}",\`address\`="${address}",\`phone\`="${phone}",\`image\`="${image}",\`department\`="${department}",\`biography\`="${biography}",\`callback\`="${callback}"where id = "+id "`;
    con.query(query,callback);
    console.log(query);
}

module.exports.delectDoc = function(id,callback){
    var query = `delete * from doctor where id = '${id}'`
    con.query(query,callback);
    console.log(query);
}

module.exports.searchDoc = function(id,callback){
    var query = `select * from  where first_name like "%' +key+'%'"` 
    con.query(query,callback);
    console.log(query);
}

module.exports.getalldept = function(id,callback){
    var query = "select * from departments "; 
    con.query(query,callback);
    console.log(query);
}

module.exports.getleavebyid=function(id,callback){
    var query = "select *from leaves where id ="+id;
    con.query(query,callback)

}

module.exports.getAllleave=function(callback){
    var query = "select *from leaves ";
    con.query(query,callback)

}

module.exports.add_leave = function(name,id,type,from,to,reason,callback){
    var query ="INSERT into `leaves` (`employee`,`emp_id`,`leave_type`,`date_from`,`date_to`,`reason`) values('"+name+"','"+id+"','"+type+"','"+from+"','"+to+"','"+reason+"',)"
    console.log(query)
    con.query(query,callback);
}

module.exports.deleteleave = function(id,callback){
    var query = `delete from leaves where id = ${id}`;
    con.query(query,callback)
}


module.exports.getAllemployee=function(callback){
    var query = "select *from employee ";
    con.query(query,callback)
}

module.exports.add_employee = function(name,email,contact,join_date,role,salary,callback){
    var query ="INSERT into `employee` (`name`,`email`,`contact`,`join_date`,`role`,`salary`,`callback`) values('"+name+"','"+email+"','"+contact+"','"+join_date+"','"+role+"','"+salary+"',)"
    console.log(query)
    con.query(query,callback);
}

module.exports.searchEmp = function(id,callback){
    var query = `select * from  employee where name like "%' +key+'%'"` ;
    con.query(query,callback);
    console.log(query);
}

module.exports.deleteEmp= function(id,callback){
    var query = "delete from emloyee where id = "+id;
    console.log(query);
}


module.exports.editEmp=function(id,name,email,contact,join_date,role,callback){
    var query = "update `employee` set `name` = '"+name+"',`email`='"+email+"',`contact`='"+contact+"',`join_date`='"+join_date+"',`role`='"+role+"'where id = '+id";
    con.query(query,callback);
}    

module.exports.getEmpbyId= function(id,callback){
    var query = "select* from emloyee where id = "+id;
    console.log(query);
}

module.exports.edit_leave=function(id,name,leave_type,from,to,reason,callback){
    var query = "update `employee` set `name` = '"+name+"',`leave_type`='"+leave_type+"',`date_from`='"+from+"',`date_to`='"+to+"',`reason`='"+reason+"'where id = '+id";
    con.query(query,callback);
} 