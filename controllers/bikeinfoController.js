// try catch is not requre it will deal with the error present in the courses
const asyncHandler = require('express-async-handler');
const BikeInfo= require("../models/bikeinfoModel");
const bcrypt= require('bcrypt');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const {upload}= require('../middleware/multerConfig');


// get all the bike info
const getbikeinfo= asyncHandler( async(req,res)=>{
    const bikeInfo= await BikeInfo.find();
    res.status(200).json(bikeInfo);
   
});

//create a new bike info
// post  method
// 

// Create a new bike info
const createBikeInfo = asyncHandler(async (req, res) => {
  const {
    citizenshipNo,
    phoneNumber,
    vehicleName,
    vehicleCC,
    vehicleModel,
    vehicleDetail,
    vechileColor,
    rentPrice,
    isreserved


  } = req.body;

//upload image logic is there 

const imageUrls = await uploadImages(req.files);
const vechilePicture = imageUrls[0];
const billbookPic = imageUrls[1];


  if (
   !citizenshipNo ||
   !phoneNumber ||
   !vehicleName ||
   !vehicleCC ||
   !vehicleModel ||
   !vechilePicture ||
   !vehicleDetail ||
   !vechileColor ||
   !rentPrice ||
   !billbookPic ||
   !isreserved

    ) {
    // return res.status(400).json({ error: 'Missing required fields' });
    res.status(400);
    throw new Error("All are mandatory ");
  }
  // const hashedPassword = await bcrypt.hash(password, 10);
  const bikeInfo = await BikeInfo. create({
 citizenshipNo,
 phoneNumber,
 vehicleName,
 vehicleCC,
 vehicleModel,
 vechilePicture,
 vehicleDetail,
 vechileColor,
 rentPrice,
 billbookPic,
 isreserved

  });
  //  bikeInfo.save();
  res.status(201).json(bikeInfo);
});


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



module.exports = {
  createBikeInfo,
};






// get bike info by id
const getBikeInfoById= asyncHandler(async (req,res)=>{
 const bikeInfo = await BikeInfo.findById(req.params.id);
if(!bikeInfo){
    res.status(404).json({ error: 'Bike info not found' });
}
else{
    res.status(200).json(bikeInfo);
}
    
});



// update bike info 
// put 

const updateBikeInfo= asyncHandler(async(req,res)=>{
 const bikeInfo = await BikeInfo.findByIdAndUpdate(req.params.id, req.body,{new:true});
 if(!bikeInfo){
    res.status(404).json({ error: 'Bike info not found' });
    }
    else{
        res.status(200).json(bikeInfo);
        }
});

// delete bike info 
const deleteBikeInfo= asyncHandler(async(req,res)=>{
    const bikeInfo = await BikeInfo.findByIdAndDelete(req.params.id);
    if(!bikeInfo){
        res.status(404);
        throw new Error("Bike info not found");
        }
        
            //  await BikeInfo.findByIdAndRemove();
            //  remove({id:bikeInfo.id});
            res.status(200).json({message:"Bike info deleted"});
            
            });
            module.exports={
                createBikeInfo,
                getbikeinfo,
                getBikeInfoById,
                updateBikeInfo,
                deleteBikeInfo

            } ;




