import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/fileupload.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import dotenv from 'dotenv';
const registerUser = asyncHandler (async(req,res)=>{

    // Steps for creating new User Details

    // get user details from frontend
    // validate it non empty
    // check if the user already exits or Not : username and email
    // check for image and avatar
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response
        
    const{email,username,fullname,password} = req.body
    // console.log("email:",email,"fullname:",fullname);

    if(
        [email, username , fullname , password ].some((field) => field?.trim() === "")
    )
    {
        throw new ApiError(400,"All fields are required")
    }
    
    const exitedUser = await User.findOne({
        $or: [{ username },{ email }]
    })
    
    if(exitedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    

    console.log(req.files);

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path || "";
    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required!!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while user registration  ")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User created Successfully !!")
    )


})

export {
    registerUser,
}