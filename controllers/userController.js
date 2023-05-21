const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const {upload}= require('../middleware/multerConfig');
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const imageUrls = await uploadImages(req.files);
  const photo_1 = imageUrls[0];
  const photo_2 = imageUrls[1];

  if (!username || !email || !password || !photo_1 || !photo_2) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const isValidEmail = emailValidator.validate(email);
  if (!isValidEmail) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password:hashedPassword,
    photo_1,
    photo_2,
  });

  await newUser.save();

  if (newUser) {
    res.status(201).json({ _id: newUser._id, email: newUser.email, password, photo_1, photo_2 });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});

//here it starts now 

async function uploadImages(images) {
  const imageUrls = [];

  for (const image of images) {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(image.path));

 //   Access the API key using the environment variable
 const apiKey = process.env. USER_API_KEY;

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        key: apiKey, // Replace with your ImgBB API key
      },
    });

    imageUrls.push(response.data.data.url);
  }

  return imageUrls;
}

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   res.json(loginUser);
//  // token here 
//   const token = jwt.sign({ email: user.email, userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

//   const passwordMatch= await bcrypt.compare(password, user.password);
//   if (!passwordMatch) { 
//     res.status(400);
//     throw new Error("Password is not matched ");
//     }

//   res.json({ message: "Login successful" });
// });
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  // Perform user authentication here
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Compare the password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  // Define your secret key
  const secretKey = "abcd";

  // Generate JWT token
  const token = jwt.sign({ email: user.email, userId: user._id }, secretKey, { expiresIn: '1h' });

  res.json({ message: "Login successful", token });
});



module.exports = { registerUser, loginUser, upload };
