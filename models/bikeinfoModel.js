
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
  id:{
    type: Number,
    required:true

  },
  userId:{
    type:Number,
    required:true
  },
  vehicleName:
  { type: String,
    required: true },


  citizenshipno:
 { type: Number,
    required: true },

  phonenumber: 
  { type: Number, 
   required: true },


  bikeCC:
   { type: Number,
    required: true },

  bikemodel:
   { type: Number,
     required: true },

  licenceimageId:
   { type: String,
     required: true },

  vehicledetail:
   { type: String,
     required: true },

  bikecolor:
   { type: String,
     required: true },

  rentprice: 
  { type: Number,
     required: true },

  // billbookPic:
  //  { type: String,
  //    required: true },

     bikepic:
     { type: String,
       required: true },
  
 
  // isreserved:
  //  { type:Boolean,
  //    default: false },


});

const BikeInfo = mongoose.model('BikeInfo', bikeSchema);

module.exports = BikeInfo;
