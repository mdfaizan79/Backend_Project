import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

    username:{
    type: String,
    require : true
    },
    email :{
        type: String,
        require: true,
        lowercase : true

    }
},{timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema)