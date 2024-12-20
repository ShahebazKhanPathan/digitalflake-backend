// Load required modules
const express = require('express');
const multer = require("multer");

// Load controller functions
const { adminLogin, adminLogout, createNewRole, createNewUser, updateUserByID, updateRoleByID, getRoles, getUsers, getUserByID, deleteRoleByID, deleteUserByID } = require('../controllers/all.controller');
const auth = require('../middlewares/auth');

// Create express router
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files to "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Create routes
router.post('/login', adminLogin);
router.post('/logout', adminLogout);
router.post('/user', auth, upload.single("photo"), createNewUser);
router.post('/roles', auth, createNewRole);
router.get('/roles', auth, getRoles);
router.get('/user', auth, getUsers);
router.delete('/roles/:id', auth, deleteRoleByID);
router.delete('/user/:id', auth, deleteUserByID);
router.get('/user/:id', getUserByID);
router.put('/user/:id', auth, upload.single("photo"), updateUserByID);
router.put('/role/:id', auth, updateRoleByID);


// Export router
module.exports = router;
