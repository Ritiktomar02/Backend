import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  auther: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  
  post:{
     type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  }
});

const comments= mongoose.model("comments", commentSchema);

export default comments;
