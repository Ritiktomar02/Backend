import {v2 as cloudinary} from "cloudinary"


cloudinary.config({
    cloud_name:"dhfiqqw2q",
    api_key:"976351233969731",
    api_secret:"AIzaSyBCjRzHzFQuQjzU41B5mYAcXGvWPxsi96A",
})

export const uploadCloudinary=async(localfilePath)=>{

    try {
        if(!localfilePath) return NULL;

        const response=await cloudinary.uploader.upload(localfilePath,{
            resource_type:"auto",
        })
    } catch (error) {
        console.log("Error: ",error)
    }
}

