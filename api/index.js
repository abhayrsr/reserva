const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;
const bcryptSalt = bcrypt.genSaltSync(10);
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.send("hello world");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(553).json({ error: e });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  // console.log(userDoc);
  if (userDoc){
    const passOk  = bcrypt.compareSync(password, userDoc.password);
    console.log(passOk)
    
    if(passOk) {
      jwt.sign({email: userDoc.email, _id: userDoc._id}, jwtSecret, {}, (err,token) => {
        if(err) throw err;
        res.cookie('token', '').json('pass ok');
      } )
      
    } else {
      res.status(401).send("unauthorized");
    }
    
  } else {
    res.json("not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
