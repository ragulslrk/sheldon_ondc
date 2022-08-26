const mongoose=require('mongoose')
const new_schema=mongoose.Schema
const user=new new_schema({
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

    balance:{
        required:false,
        type:Number,
        default:0
    }
},{versionKey:false})
const  user_mod=mongoose.model('customers',user)
module.exports=user_mod