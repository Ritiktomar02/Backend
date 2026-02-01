import express from "express"
import User from "./models/users.js";
const app=express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.get("/",(req,res)=>{
    res.render("index")
})

app.post("/create",async (req,res)=>{
    const {name,email,image}=req.body;
    const newUser=await User.create({
        name,
        email,
        image,
    })
    res.send(newUser)
})

app.get("/read",async (req,res)=>{
    const allUser=await User.find();
    res.render("read",{allUser})
})

app.listen(3000)