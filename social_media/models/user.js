import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/socialMedia")

const userSchema=new mongoose.Schema({

    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"post"
        }
    ]
})

const user=mongoose.model("user",userSchema);

export default user;