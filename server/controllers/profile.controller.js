const ProfileService = require("../services/profileService/profile.service");

// * Only repsonsible for handling the input and output, business logic specified in model's service
exports.get = async function(req, res) {
    // TODO Error check the request
    try {
    const data = await ProfileService.getProfile(req.params.playername);

    res.json(data);
    } catch (error) {
        res.sendStatus(404);
    }
}
