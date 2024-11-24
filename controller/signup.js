var express =require ('express');
var router =express.Router();
var bodyParser =require('body-parser');
const db_signup = require.main.require('./models/db_controller');
var mysql = require('mysql');
var nodemailer =require('nodemailer');
var randomToken = require('random-token');
const{check,validationResult} = require('express-validator');

router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());

router.post('/',[check('username').notEmpty().withMessage("username is required"),
    check('password').notEmpty().withMessage("password is required"),
    check('email').notEmpty().withMessage("email is required"),
],function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors:errors.array()})
    }
    var email_status = "not_verified";
    var email = req.body.email;
    var username =req.body.username;

    db_signup.signup(req.body.username,req.body.email,req.body.password,email_status);
    var token =randomToken(8);
    db_signup.verify(req.body.username,email,token)

    db_signup.getuserid(email,function(err,result){
        console.log(email);
        console.log(result);
        var id = result[0].id;
        var output =`<p>Dear${username},</p>
        <p>Thanks for sign up.Your verification id and token is given below:</p>
        <ul>
           <li>User ID: ${id}</li> 
           <li>Token: ${token}</li>
             </ul>
           <p>verify link:<a href="http://localhost:4000/verify"></a>Verify</p> 
           <p><b>This is automatically generated mail</b></p>`;

           var transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:465,
            secure:true,
            auth:{
                user:"rasindunirasha7@gmail.com",
                pass:"ds@20000107rnr"
            }
           });
           var mailOption={
            from:'Hms@gmail.com',
            to:email,
            subject:'Email verification',
            html:output
           };

           transporter.sendMail(mailOption,function(err,info){
                 if(err){
                    return console.log(err);
                 }
                 console.log(info);
           });

           res.send("check your email for token to verify")
      
    })
})

module.exports=router;

