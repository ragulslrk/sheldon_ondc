const route  =require('express').Router()
const  merchant=require('../model/merchant')
const  customer=require('../model/customer')
const jwt = require("jsonwebtoken");
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




module.exports=route 