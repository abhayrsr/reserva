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
const jwtSecret = process.env.JWT_SECRET;

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

  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  // console.log(userDoc);
  if (userDoc){
    const passOk  = bcrypt.compareSync(password, userDoc.password);
    console.log(passOk)
    
    if(passOk) {
      jwt.sign({email: userDoc.email, _id: userDoc._id}, jwtSecret, (err,token) => {
        if(err) throw err;
        res.cookie('token', token).json(userDoc);
        console.log(token)
      } )
      
    } else {
      res.status(422).json("pass not ok");
    }
    
  } else {
    res.json("not found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
