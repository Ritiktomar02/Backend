import express from "express";
import path from "path";
import fs from "fs"
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.post("/form-data", (req, res) => {
   const {title,description}=req.body;
   fs.writeFile(`./files/${title.split(" ").join('')}.txt`,description,(err)=>{
    if(err) throw err;
    res.redirect("/")
   })
});

app.get("/",(req,res)=>{
  fs.readdir('./files',(error,files)=>{
     res.render("index",{files:files})
  })
 
})

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
