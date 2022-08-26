const  route=require('express').Router()
const customer=require('../model/customer')
const merchant = require('../model/merchant')
const user=require("../model/user")

const {v4:uuidV4}=require("uuid")
//route  to customer signup  
route.post('/customer_signup',(req,res)=>{
    user.findOne({
        username:req.body.username
    })
    .then(result=>{
        if(result){
            res.send('username already exists')
        }
       else{
        const new_user= new user({
            username:req.body.username,
            role:'customer',
            password:req.body.password
        })
        new_user.save()
        const new_customer=new customer({
            username:req.body.username,
            role:'customer',
            password:req.body.password,
            email:req.body.email,
            phno:req.body.phno,
            address:req.body.address,
            
        })
        new_customer.save()
        res.send('Success')
       }
    })
    .catch(err=>{
        console.log(err);
    })

    
})
//route to merchant signup  
route.post('/merchant_signup',(req,res)=>{
    user.findOne({
        username:req.body.username
    })
    .then(result=>{
        if(result){
            res.send('username already exists')
        }
        else{

            const new_user= new user({
                username:req.body.username,
                role:'merchant',
                password:req.body.password
            })
            new_user.save()
            const new_merchant = new merchant({
                username:req.body.username,
                role:'merchant',
                password:req.body.password,
                email:req.body.email,
                phno:req.body.phno,
                address:req.body.address,
                shop_name:req.body.shop_name,
                apikey:uuidV4(),
                gstin_no:req.body.gst_in

            })
            new_merchant.save()
            res.send('Success')

        }
 
})
.catch(err=>{
    console.log(err);
})


})

route.get('/mer',(req,res)=>{
    merchant.findOne({"username":'ragulnolan'})
    .then(result=>{
        console.log(result);
        res.send(result)
    })
})

module.exports=route