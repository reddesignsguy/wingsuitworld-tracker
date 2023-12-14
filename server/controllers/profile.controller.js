const {getProfile, claimProfile, unclaimProfile} = require("../services/profile.service");

// TODO Error checking
exports.get = async function(req, res) {
    try {
        const data = await getProfile(req.params.playername);
        res.json(data);
    } catch (err) {
        res.sendStatus(404);
    }
}

exports.claim = async function(req, res) {
    // Validate request
    if (Object.keys(req.body).length === 0) {
        res.status(400).send("Content can not be empty!");
    }

    // TODO Make sure user is logged in (token)

    try {
        const result = await claimProfile(req.body.userId, req.body.playerName, req.body.profileCode);
        res.status(result.status_code).send(result.message);
    } catch (err) {
        // TODO Log the errors
        res.status(err.status_code).send(err.message);
    }
}

exports.unclaim = async function(req, res) {
        // Validate request
        if (Object.keys(req.body).length === 0) {
            res.status(400).send("Content can not be empty!");
        }
    
        // TODO Make sure user is logged in (token)
    
        try {
            const result = await unclaimProfile(req.body.userId);
            res.status(result.status_code).send(result.message);
        } catch (err) {
            // TODO Log the errors
            res.status(err.status_code).send(err.message);
        }
}