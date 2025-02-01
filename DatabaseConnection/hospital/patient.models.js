import mongoose from "mongoose";
const patientSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    age:{
    type : Number,
    required : true
    },
    bloodgroup:{
        type : String,
        required : true
        },
    gender :{
        type : String,
        enum : ["Male","Female","Others"],
        required : true
    },

    issue :{
    type : String,
    required : true
    }
}, { timestamps: true });

export const Patient = mongoose.model("Patient", patientSchema);
