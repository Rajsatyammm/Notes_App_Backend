const express = require('express');
const { registerUser, loginUser, verifyToken, getUserProfile, updateProfile } = require('../controllers/UserController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getUserProfile);
router.put('/updateProfile', verifyToken, updateProfile)

module.exports = router;
