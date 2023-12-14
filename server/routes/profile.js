const express = require("express")
const Profile = require("../controllers/profile.controller");
const profileRoutes = express.Router(); 

require('dotenv').config();

// Get player datastore
profileRoutes.get('/:playername', Profile.get);

profileRoutes.put('/claim', Profile.claim);

profileRoutes.put('/unclaim', Profile.unclaim);

module.exports = profileRoutes; 