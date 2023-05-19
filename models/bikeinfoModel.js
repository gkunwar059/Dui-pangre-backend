
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({

  citizenshipno:
 { type: Number,
    required: true },

  phonenumber: 
  { type: Number, 
   required: true },

  bikeCC:
   { type: String,
    required: true },

  bikemodel:
   { type: String,
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

  bikepic:
   { type: String,
     required: true },

  id:
   { type: String,
     required: true },

  userId: 
  { type: String,
     required: true },

  vehiclename:
   { type: String,
     required: true },

  isreserved:
   { type:Boolean,
     default: false },

  email:
   { type: String,
     required: true },

  password:
   { type: String,
     required: true },

});

const BikeInfo = mongoose.model('BikeInfo', bikeSchema);

module.exports = BikeInfo;
