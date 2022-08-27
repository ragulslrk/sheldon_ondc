const route  =require('express').Router()
const  merchant=require('../model/merchant')
const  customer=require('../model/customer')
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer")
const handlebars = require("handlebars")
const fs = require("fs")
const path = require("path")
const  transaction=require('../model/transaction')

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
            {result.otp=otp
                result.save()
                console.log("Successfully sent")
                res.json({msg:'otp send'})
            }
        })
        
    })
   
})


route.get('/verify_buy/:api_key/:token/:product_name/:product_price/:otp',(req,res)=>{
    console.log(req.params);
 merchant.findOne({apikey:req.params.api_key})
    .then((result)=>{
        console.log(result);
        if(result== null)
        {   
            res.sendStatus(404)
        }   
        else{
            const decode = jwt.verify(req.params.token,process.env.secret_key);
            console.log(decode.customer_id);
            customer.findOne({_id:decode.customer_id})
            .then((result)=>{
                if(result.otp === req.params.otp)
                {   const price=parseInt(req.params.product_price)
                    const final_amt=result.balance-price
                    const add_trans= new transaction({
                        seller_name:decode.seller_name,
                        buyer_name:result.username,
                        buyer_balance:final_amt,
                        product_price:price,
                        product_name:req.params.product_name,
                        buyer_balance:final_amt

                    })
                    result.balance=final_amt
                    result.otp='not'
                    result.save()
                    add_trans.save()
                    res.json({'msg':'item bought'})
                }
                else
                {
                    res.json({'msg':'incorrect'})
                }
            })


        }
    
    
    })
})
module.exports=route 