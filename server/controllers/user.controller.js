const User = require("../models/user.model");

// * Controller interprets request and response from the services and makes sure to give the most detailed info to client
exports.get = async function(req,res) {
    // Get User
    try {
        const result = await User.getById(req.params.userId);
        res.status(result.status_code).send(result.message);
    } catch (err) {
        res.status(err.status_code).send(err.message);
    };
}

exports.getByPlayerName = async function(req,res) {
    try {
        const result = await User.getByPlayerName(req.params.playername);
        res.status(result.status_code).send(result.message);
    } catch (err) {
        res.status(err.status_code).send(err.message);
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
        res.status(result.status_code).send(`Created user: \n ${result.message}`);
    }
    catch (err) {
        res.status(err.status_code).send(err.message);
    }
}

exports.remove = async function(req, res) {
    try {
        const result = await User.removeById(req.params.userId);
        res.status(result.status_code).send(`Removed user: \n ${result.message}`);
    } catch (err) {
        res.status(err.status_code).send(err.message);
    }
}