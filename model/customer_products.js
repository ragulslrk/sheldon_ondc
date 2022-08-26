const mongoose=require("mongoose")
const  customer_products_schema=mongoose.Schema({
    buyer_name:{
        required:false,
        type:String
    },
    product_name:{
        required:false,
        type:String
    },
    product_price:{
        required:false,
        type:String
    },
    seller_name:{
        required:false,
        type:String
    },
    balance:{
        required:false,
        type:String
    }
},{versionKey:false})
const  customer_mod=mongoose.model('customer_products',customer_products_schema)
module.exports=customer_mod
