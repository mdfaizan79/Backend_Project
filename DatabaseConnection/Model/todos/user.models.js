import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

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

export const User = mongoose.model("User",userSchema)