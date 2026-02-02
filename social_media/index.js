import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import user from "./models/user.js";
import post from "./models/post.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

const JWT_SECRET = "ritik"; // use SAME secret everywhere

app.get("/", (req, res) => {
  res.render("index");
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.redirect("/profile");
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN PAGE
app.get("/sign-in", (req, res) => {
  res.render("login");
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.redirect("/profile");
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// LOGOUT
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.redirect("/sign-in");
});

app.get("/profile", isLoggin, async (req, res) => {
  const curr_user = await user
    .findById(req.userId)
    .populate("post");

  res.render("home", {
    curr_user,
    postarray: curr_user.post,
  });
});



app.post("/create-post", isLoggin, async (req, res) => {
  const { postimg, content } = req.body;

  if (!content || !postimg) {
    return res.status(400).json({ message: "Content is required" });
  }

  const curr_user = await user.findById(req.userId);
  if (!curr_user) {
    return res.status(404).json({ message: "User not found" });
  }

  const new_post = new post({
    postimg,
    content,
    author: curr_user._id,
  });

  await new_post.save();

  curr_user.post.push(new_post._id);
  await curr_user.save();

  res.redirect("/profile");
});


function isLoggin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/sign-in");
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.userId = data.userId;
    next();
  } catch (err) {
    return res.redirect("/sign-in");
  }
}

app.post("/posts/:id/like", isLoggin, async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  const postData = await post.findById(postId);
  if (!postData) {
    return res.status(404).send("Post not found");
  }

  const alreadyLiked = postData.likes.includes(userId);

  if (alreadyLiked) {
    // UNLIKE
    postData.likes = postData.likes.filter(
      id => id.toString() !== userId
    );
  } else {
    // LIKE
    postData.likes.push(userId);
  }

  await postData.save();
  res.redirect("/profile");
});


app.listen(3000);
