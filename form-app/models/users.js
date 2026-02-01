import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/form-data")

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    image:String
},{timestamps:true})

const User=mongoose.model("user",userSchema);

export default User;