const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');
const {upload, uploadResume} = require('../middleware/uploadMiddleware');

router.get('/', getProfile);
router.put('/', protect, upload.single('profilePicture'), updateProfile);
router.put('/resume', protect, uploadResume.single('resume'),updateProfile);

module.exports = router;