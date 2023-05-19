const express=require('express');
const router=express.Router();

const {  
   
    getbikeinfo,
    createBikeInfo,
    getBikeInfoById,
    updateBikeInfo,
    deleteBikeInfo

} = require('../controllers/bikeinfoController');

// api routes in the backend of any projects here 
router.route('/').get(getbikeinfo).post(createBikeInfo);



router.route('/:id').get(getBikeInfoById).put(updateBikeInfo).delete(deleteBikeInfo);





module.exports=router;