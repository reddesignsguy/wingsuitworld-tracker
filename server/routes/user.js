const express = require('express');
const userRoutes = express.Router();
const {get, create, remove, getByPlayerName} = require("../controllers/user.controller");

// 1. This route has to be before ..
userRoutes.get("/playername", getByPlayerName)

// 2. this one. Otherwise, this one overwrites the above one (probably bc. of the parameter)
userRoutes.get('/:userId', get);

userRoutes.post('/', create);

userRoutes.delete('/:userId', remove);

// ! Is the functionality of these routes too broad? Can we make more specific implementations like "setPlayerId/:user"?
// ! Doing so yields clarity for the front-end, and it's clear what functions the back-end supports
// ! However, it is not as modular and would not work well for a system where the back-end requirements are not fully laid out yet
module.exports = userRoutes;