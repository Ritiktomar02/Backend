import express from "express";
import dbconnect from "./config/db.js";
import User from "./models/user.js";

const app = express();

const startServer = async () => {
  await dbconnect();

  const users = [
    { name: "Admin", email: "admin@test.com" },
    { name: "User1", email: "user1@test.com" }
  ];

  const alreadyExists = await User.findOne({ email: "admin@test.com" });

  if (!alreadyExists) {
    await User.insertMany(users);
    console.log("Initial users inserted");
  } else {
    console.log("Users already exist, skipping insert");
  }

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
