const route  =require('express').Router()
const  merchant=require('../model/merchant')
const  customer=require('../model/customer')
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")

function generateOTP() {
          
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")
const template = handlebars.compile(emailTemplateSource)


route.get('/login/:api_key/:username/:password',(req,res)=>{
    console.log(req.params);
    merchant.findOne({apikey:req.params.api_key})
    .then((result)=>{
        console.log(result);
        if(result== null)
        {   
            res.sendStatus(404)
        }
        else{
        customer.findOne({username:req.params.username})
        .then((cust)=>{
            console.log()
            if(!cust)
            {   console.log('wrong api key');
                res.sendStatus(404)
            }
            else{
                if(cust.password === req.params.password)
                {
                    const access_token= jwt.sign({customer_id:cust._id,seller_name:result.username},process.env.secret_key)
                   const respond={
                    access_token:access_token,
                    customer_username:cust.username,
                    customer_email:cust.email
                   }
                   console.log(respond);
                    res.json(respond)
                }
                else{
                    res.sendStatus(404)
                }
            }

           
        })
        }
        
    })
})


route.get('/sendotp/:access_token',(req,res)=>{
    
    const decode = jwt.verify(req.params.access_token,process.env.secret_key);
    console.log(decode);
    customer.findOne({_id:decode.customer_id})
    .then((result)=>{
        console.log(result.email);
        let mailTransport=nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth:{
                user:"wallet.sheldon@gmail.com",
                pass:"amkunzmcvmvmpxuh",
            },
        });
        const otp=generateOTP()
        const htmlToSend = template({user:result.username,otp:otp,
        seller_name:decode.seller_name})
        let details={
            from:"wallet.sheldon@gmail.com",
            to:result.email,
            subject:"Product Otp",
            html:htmlToSend,
        };
        
        mailTransport.sendMail(details,(err)=>{
            if(err)
            {
                console.log("Errror",err)
            }
            else
            {
                console.log("Successfully sent")
                res.json({msg:'otp send'})
            }
        })
        
    })
   
})

module.exports=route 