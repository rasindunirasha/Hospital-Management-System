var express = require('express');
var flash = require('flash');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var randomToken = require('random-token');
var db = require.main.require('./models/db_controller');

// router.get('/',function(req,res){
//     res.render('resetpassword.ejs')
// })

router.post('/',function(req,res){
    var email = req.body.email;
    db.findOne(email,function(err,resolution){
        if(!resultone){
            console.log("Mail does not exist");
            res.send("Mail does not exist")
        }
        var id = resultone[0].id;
        var email = resultone[0].email;
        var token = randomToken(8);
        db.temp(id,email,token,function(err,resulttwo){
            var output = `<p>Dear user </p>
            <p>You are receiving this email because you requested to reset yur password</p>
            <ul>
            <li>User ID : `+id+`</li>
            <li>Token : `+token+`</li>
            
            </ul>`

            var transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'',
                    pass:''
                }
            });
            var mailOptions = {
                from:'HMS Team',
                to:email,
                subject:'Password reset',
                html:output
            };
            transporter.sendMail(mailoptions,function(err,info){
                if(err){
                    return console.log(err);
                }else{
                    console.log(info);
                }
            })
        })
    })
    res.send("A token has been to your email Address")
})

module.exports = router;