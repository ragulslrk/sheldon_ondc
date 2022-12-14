const  mongoose=require('mongoose')
const  merchant_schema=mongoose.Schema({
    username:{
        required:false,
        type:String
    }
    ,password:{
        required:false,
        type:String
    },
    email:{
        required:false,
        type:String
    },
    phno:{
        required:false,
        type:String
    },
    role:{
        required:false,
        type:String
    },
    address:{
        required:false,
        type:String
    },
    otp:{
        required:false,
        type:String,
        default:'not'
    },
    shop_name:{
        required:false,
        type:String
    },
    gstin_no:{
        required:false,
        type:String
    },
    apikey:{
        required:false,
        type:String
    }
})
const merchant_mod =mongoose.model('merchants',merchant_schema)
module.exports=merchant_mod