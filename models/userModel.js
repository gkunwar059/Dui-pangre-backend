const mongoose= require('mongoose');

const userSchema = new  mongoose.Schema({
    username: {
        type: String,
        required: true
        },

    email:{
        type: String,
        required: true
        },
    password:{
        type: String,
        required: true
        },
    photo_1:{
        type:String,
        require:true
    //    default:'default.jpg'
    },
    photo_2:{
      type:String,
      require:true
    //   default:'default.jpg'
    },
    
    },{
        timestamps:true
    });

    const User= mongoose.model('User',userSchema);
    module.exports= User;