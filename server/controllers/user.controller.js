const User = require("../models/user.model");

// ! Controller interprets request and response from the services
exports.get = async function(req,res) {
    // Get User
    try {
        const result = await User.getUserById(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(404).send(`Getting user by id failed. \n Error Message: ${err}`);
    };
}

// ! This method should fill out all fields of User for futureproofing (possibly for things like age, dark mode, etc, liked maps from when not logged in, etc)
exports.create = async function(req,res) {
    const user = new User({
        userId: req.body.userId,
        playername: req.body.playername
    });
    try {
        const result = await User.createById(user);
        res.send(result);
    }
    catch (err) {
        res.status(500).send(`Creating new user failed. \n ${err}`);
    }
}

exports.remove = async function(req, res) {
    // Delete user from DB
    try {
        const result = await User.removeById(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(500).send(`Removing user failed. \n ${err}`, err);
    }
}

exports.updatePlayerNameById = async function(req, res) {
    // Validate request
    if (!req.body) {
        res.status(400).send({message: "Content can not be empty!"});
    }

    // ! Here, we logically make this controller update ONLY the playername
    // ! Go to user.model.js -> update function for next comment
    const user = new User({userId: req.params.userId, playerName: req.body.playername});
    try {
        const result = await User.update(user);
        res.json(JSON.stringify(result));
    } catch (err) {
        res.send(`Failed to update player's playername by id. \n ${err}`);
    }
}