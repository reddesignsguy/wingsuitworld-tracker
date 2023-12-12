const express = require("express")
const Profile = require("../controllers/profile.controller");
const profileRoutes = express.Router(); 

require('dotenv').config();

// Get player datastore
profileRoutes.get('/:playername', Profile.get);

profileRoutes.put('/claim', Profile.claim);

module.exports = profileRoutes; 