import express from "express";
import image from "./model.js";
import { upload } from "./multer.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const allfiles = await image.find().sort({ createdAt: -1 });
  res.render("app", { allfiles });
});

app.post("/upload", upload.single("file"), async (req, res) => {
  await image.create({
    imgUrl: req.file.filename, // IMPORTANT
  });

  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
