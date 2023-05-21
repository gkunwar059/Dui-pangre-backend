const express=require('express');
const router=express.Router();
const multer = require('multer');
const {upload }= require('../middleware/multerConfig');

const {  
   
    getbikeinfo,
    createBikeInfo,
    getBikeInfoById,
    updateBikeInfo,
    deleteBikeInfo

} = require('../controllers/bikeinfoController');

// const upload = multer({ dest: 'uploads/' }); // Specify the destination directory for uploaded files

// api routes in the backend of any projects here 
// router.route('/').get(getbikeinfo).post(createBikeInfo,upload.array('images', 2));
router.route('/').get(getbikeinfo).post(upload.array('images', 2), createBikeInfo);



router.route('/:id').get(getBikeInfoById).put(updateBikeInfo).delete(deleteBikeInfo);





module.exports=router;