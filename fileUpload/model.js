import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/imageUpload");

const imageSchema = new mongoose.Schema(
  {
    imgUrl: String,
  },
  { timestamps: true }
);

const image = mongoose.model("image", imageSchema);
export default image;
