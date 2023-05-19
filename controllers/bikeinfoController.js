// try catch is not requre it will deal with the error present in the courses
const asyncHandler = require('express-async-handler');
const BikeInfo= require("../models/bikeinfoModel");
const bcrypt= require('bcrypt');


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
    citizenshipno,
    isreserved = false,
    email,
    password,
    userId,
    id,
    bikepic,
    vehicledetail,
    bikecolor,
    rentprice,
    licenceimageId,
    phonenumber,
    bikeCC,
    bikemodel,
    vehiclename,
  } = req.body;

  if (
    !citizenshipno ||
    !email ||
    !password ||
    !userId ||
    !id ||
    !bikepic ||
    !vehicledetail ||
    !bikecolor ||
    !rentprice ||
    !licenceimageId ||
    !phonenumber ||
    !bikeCC ||
    !bikemodel ||
    !vehiclename
  ) {
    // return res.status(400).json({ error: 'Missing required fields' });
    res.status(400);
    throw new Error("All are mandotary ");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const bikeInfo = await BikeInfo. create({
    citizenshipno,
    isreserved,
    email,
    password:hashedPassword,
    userId,
    id,
    bikepic,
    vehicledetail,
    bikecolor,
    rentprice,
    licenceimageId,
    phonenumber,
    bikeCC,
    bikemodel,
    vehiclename,
  });

//   bikeInfo.save();
  res.status(201).json(bikeInfo);
});

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




