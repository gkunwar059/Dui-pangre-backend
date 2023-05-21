// try catch is not requre it will deal with the error present in the courses
const asyncHandler = require('express-async-handler');
const BikeInfo= require("../models/bikeinfoModel");
const bcrypt= require('bcrypt');
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const {upload}= require('../middleware/multerConfig');

const getSortedBikeInfo = asyncHandler(async (req, res) => {
  const { sort } = req.query;
  let bikeInfo;

  if (sort === 'highToLow') {
    bikeInfo = await BikeInfo.find().sort({ rentPrice: -1 });
  } else if (sort === 'lowToHigh') {
    bikeInfo = await BikeInfo.find().sort({ rentPrice: 1 });
  } else {
    res.status(400).json({ error: 'Invalid sorting option' });
    return;
  }

  res.status(200).json(bikeInfo);
});

const getUnsortedBikeInfo = asyncHandler(async (req, res) => {
  const bikeInfo = await BikeInfo.find();
  res.status(200).json(bikeInfo);
});   

//With this new endpoint, you can now make requests to /api/bikeinfo/sort?sort=highToLow to retrieve bike information sorted from high to low, and /api/bikeinfo/sort/lowToHigh to retrieve bike information sorted from low to high.

// Create a new bike info
const createBikeInfo = asyncHandler(async (req, res) => {
  // console.log(req);
  // return ;
  const {
    id,
    userId,
    vehicleName,
    citizenshipno,
    phonenumber,
    bikeCC,
    bikemodel,
    // licenceimageId,
    vehicledetail,
    bikecolor,
    rentprice,
    // bikepic
    


  } = req.body;
  // console.log(req.body)

//upload image logic is there 

const imageUrls = await uploadImages(req.files);
const  licenceimageId = imageUrls[0];
const  bikepic = imageUrls[1];


if (
  !id ||
  !userId||
  !vehicleName ||
  !citizenshipno ||
  !phonenumber ||
  !bikeCC ||
  !bikemodel ||
  !licenceimageId ||
  !vehicledetail ||
  !bikecolor ||
  !rentprice ||
  !bikepic 
 )
 {
console.log(error);
   res.status(400).json({ error: 'Missing required fields' });
   return; // Add this line to exit the function after sending the response
 }
 
  // const hashedPassword = await bcrypt.hash(password, 10);
  const bikeInfo = await BikeInfo. create({
    id ,
    userId,
    vehicleName ,
    citizenshipno ,
    phonenumber ,
    bikeCC ,
    bikemodel ,
    licenceimageId ,
    vehicledetail ,
    bikecolor ,
    rentprice ,
    bikepic,

  });

  //  bikeInfo.save();
  res.status(201).json(bikeInfo);
  // console.log(bikeInfo);
});

// file upload logic is here
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
                getSortedBikeInfo,
                getUnsortedBikeInfo,
                getBikeInfoById,
                updateBikeInfo,
                deleteBikeInfo

            } ;




