import mongoose from "mongoose";

const dbconnect=async()=>{

    try{
        await mongoose.connect("mongodb://localhost:27017/test").then(()=>{
            console.log("MongoDB connected");
        })
    }catch(error){
       console.log("Error: ",error)
    }
}

export default dbconnect;