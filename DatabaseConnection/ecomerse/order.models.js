import mongoose from "mongoose";

const oderItemSchema = new mongoose.Schema({
    productId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product"
    },
    quantity:{
    type : Number,
    default : 0
    }
});

const orderSchema = new mongoose.Schema({
orderPrice : {
    type : Number,
    required : true
},
customer :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
},
orderItem :{
    type: [oderItemSchema]
},
address:{
    type : String,
    required : true
}
},{timestamps : true})

export const Order = mongoose.model("Order",orderSchema)