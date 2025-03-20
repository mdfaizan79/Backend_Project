import {v2 as cloudinary } from "cloudinary" ;
import fs from "fs" ;

 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
    if(!localFilePath) return null;

    //Upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto"
    })
    
    //file has uploaded sucessfully
    console.log("File is Uploaded on Cloudinary ", response.url);
    return response;
    }
    catch(error){
    fs.unlinkSync(localFilePath) //remove the locally saved temp file as uploaded operation got failed
    return null;
    }
}


// cloudinary.v2.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg"),
// { public_id: 'shoes'},
// function(error,result) 



// Upload an image
const uploadResult = await cloudinary.uploader
.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
        public_id: 'shoes',
    }
)
.catch((error) => {
    console.log(error);
});

console.log(uploadResult);

export {uploadOnCloudinary}