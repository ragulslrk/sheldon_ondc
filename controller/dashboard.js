const route =require('express').Router()



route.get('/dashboard',(req,res)=>{
    if(req.isAuthenticated())
    {
        if(req.user.role === 'customer')
        {
            res.redirect('/customer_dashboard')
        }
        else if(req.user.role === 'merchant')
        {
                res.redirect('/merchant_dashboard')
        }
    }
    else {
        res.redirect("/login")
    }

})

module.exports=route