
const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({

  citizenshipNo:
 { type: Number,
    required: true },

  phoneNumber: 
  { type: Number, 
   required: true },

   vehicleName:
   { type: String,
     required: true },


  vehicleCC:
   { type: Number,
    required: true },

  vehicleModel:
   { type: Number,
     required: true },

  vechilePicture:
   { type: String,
     required: true },

  vehicleDetail:
   { type: String,
     required: true },

  vechileColor:
   { type: String,
     required: true },

  rentPrice: 
  { type: Number,
     required: true },

  billbookPic:
   { type: String,
     required: true },

 
  isreserved:
   { type:Boolean,
     default: false },


});

const BikeInfo = mongoose.model('BikeInfo', bikeSchema);

module.exports = BikeInfo;
