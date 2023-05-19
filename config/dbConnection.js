const mongoose=  require('mongoose');
// const { default: mongoose } = require("mongoose");   

const connectionDb = async()=>{
  
    try{
   const connect= await mongoose.connect(process.env.CONNECTION_STRING);
   console.log('Connection establlished',connect.connection.host, connect.connection.name);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
};
module.exports= connectionDb;