import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

    content:{
        type : String,
        required : true
    },
    complete:{
        type : Boolean,
        default : false
    },
    createdBy :{
        type : mongoose.Schema.ObjectId,
        ref :"User"
    },
    subTodo:[
        {
        type: mongoose.Schema.ObjectId,
        ref : "SubTodo"
        }
    ] //Array of Subtodo
        
    
},{timestamps : true})

export const Todo = mongoose.model("Todo",todoSchema)