const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const emailValidator = require("email-validator");
const path= require('path'); 
const multer= require('multer');
//@desc register all users
//@route POST /api/users/register 
//@access public



// setup multer storage configuration
const storage= multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'/uploads');  // specify the directory where the files will be saved
    },
   filename:(req,file,cb)=>{
    const uniqueSuffix= Date.now() + '-' + Math.round(Math.random() *1e9);
    const fileExt=path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExt); // set the file name 
  },

});

// Create the Multer instance
const upload = multer({ storage });


const registerUser = asyncHandler(async (req, res) => {

// file upload  error
upload.single('profilePic')(req, res, async (err) => {
    if (err) {
      // Handle file upload error
      return res.status(500).json({ error: 'Failed to upload file.' });
    }

  // Access the uploaded file information
  const profilePic = req.file;




  const { username, email, password, photo_1, photo_2 } = req.body;

  if (!username || !email || !password || !photo_1 || !photo_2) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const isValidEmail = emailValidator.validate(email); 
  
  if(!isValidEmail){
     res.status(400);
       throw new Error ('Invalid email Format ');
  }
// console.log("err");
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User is already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    photo_1:profilePic.path, // save the file path or customized 
    photo_2:profilePic.path
  });

  await newUser.save();

  if (newUser) {
    res.status(201).json({ _id: newUser._id, email: newUser.email, password,photo_1,photo_2 });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  res.json({ message: "Register the user" });
});
});

//@desc login for all users
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Additional logic for user login and authentication
  // ...

  res.json({ message: "Login successful" });
});

module.exports = { registerUser, loginUser };
