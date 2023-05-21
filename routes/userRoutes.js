const express = require('express');
const router = express.Router();
const { registerUser, loginUser} = require('../controllers/userController');
const {upload }= require('../middleware/multerConfig');
router.post('/register', upload.array('images', 2), registerUser);

router.post('/login', loginUser);

module.exports = router;
