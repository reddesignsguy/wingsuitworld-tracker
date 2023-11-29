const User = require("../models/user.model");

// * Controller interprets request and response from the services and makes sure to give the most detailed info to client
exports.get = async function(req,res) {
    // Get User
    try {
        const result = await User.getById(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(err.status_code).send(`Getting user by id failed. \n Error Message: ${err.message}`);
    };
}

// TODO This method should fill out all fields of User for futureproofing (possibly for things like age, dark mode, etc, liked maps from when not logged in, etc)
exports.create = async function(req,res) {
    const user = new User({
        userId: req.body.userId,
        playername: req.body.playername
    });
    try {
        const result = await User.create(user);
        res.send(result);
    }
    catch (err) {
        res.status(err.status_code).send(`Creating new user failed. \n ${err.message}`);
    }
}

exports.remove = async function(req, res) {
    try {
        const result = await User.removeById(req.params.userId);
        res.send(result);
    } catch (err) {
        res.status(err.status_code).send(`Removing user failed. \n ${err.message}`);
    }
}

exports.updatePlayerNameById = async function(req, res) {
    // Validate request
    if (Object.keys(req.body).length === 0) {
        res.status(400).send({message: "Content can not be empty!"});
    }

    const user = new User({userId: req.params.userId, playerName: req.body.playerName});
    try {
        const result = await User.update(user);
        res.send(JSON.stringify(result));
    } catch (err) {
        res.status(err.status_code).send(`Failed to update player's playername by id. \n ${err.message}`);
    }
}