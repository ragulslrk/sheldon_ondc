const route =require('express').Router()



route.get('/dashboard',(req,res)=>{
    
    res.send(`this is  dashboard ${req.user.role}`)
})

module.exports=route