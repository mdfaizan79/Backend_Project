import mongoose from "mongoose";
 const doctorSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    qulification:{
    type : String,
    required : true
    },
    experience:{
        type : String,
        required : true
        },

    specification :{
    type : String,
    required : true
    },
    workInHospitals :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : " Hospital"
        }
    ]
 },{timestamps : true})

 export const Doctor = mongoose.model("Doctor",doctorSchema)