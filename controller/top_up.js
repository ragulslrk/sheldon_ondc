const  route=require("express").Router()
const customer=require("../model/customer")

route.get('/topup',(req,res)=>{
    if(req.isAuthenticated() && req.user.role === 'customer')
    {
        res.render("topup")
    }
    else{
        res.render("login")
    }
})

route.post('/topup',(req,res)=>{
    if(req.isAuthenticated())
    {   const topup_amt=parseInt(req.body.topup_amt)
        customer.findOne({username:req.user.username})
        .then((result)=>{
                result.balance=result.balance+topup_amt
                result.save()
                res.redirect('/topup')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    else{
        res.redirect('/login')
    }
  
})
module.exports=route