const mongoose=require('mongoose')

const transaction_schema=mongoose.Schema({
    seller_name:{
        required:false,
        type:String
    },
    buyer_name:{
        required:false,
        type:String
    },
    product_name:{
        required:false,
        type:String
    },
    buyer_balance:{
        required:false,
        type:Number
    },
    order_details:
    {
        required:false,
        type:String,
        default:'Not Delivered'
    },
    payment_status:{
        required:false,
        type:String
    },
    product_price:{
        required:false,
        type:String
    }
}
,{versionKey:false}
)
const transaction_model =mongoose.model('transactions',transaction_schema)
module.exports=transaction_model

