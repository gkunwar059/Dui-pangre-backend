const express = require('express');
const router = express.Router();
const multer = require('multer');
const { upload } = require('../middleware/multerConfig');

const {
  getSortedBikeInfo,
  getUnsortedBikeInfo,
  createBikeInfo,
  getBikeInfoById,
  updateBikeInfo,
  deleteBikeInfo
} = require('../controllers/bikeinfoController');

// Retrieve all bike information without sorting
router.get('/', getUnsortedBikeInfo);

// Retrieve bike information with sorting
router.get('/sort', getSortedBikeInfo);

// Create a new bike info
router.post('/', upload.array('images', 2), createBikeInfo);

// Retrieve bike info by ID
router.get('/:id', getBikeInfoById);

// Update bike info
router.put('/:id', updateBikeInfo);

// Delete bike info
router.delete('/:id', deleteBikeInfo);

module.exports = router;
