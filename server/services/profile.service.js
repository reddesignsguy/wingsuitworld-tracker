const datastoreApi = require("./apis/datastoreApi/datastore.api")
const robloxUserApi = require("./apis/robloxUserApi/robloxUser.api");
const robloxUserMediaApi = require("./apis/robloxUserMediaApi/robloxUserMedia.api")
const {getImageUrl} = require("./apis/robloxUserMediaApi/robloxUserMedia.api.accessors") // TODO Change to import statement
const {getRank, getMaps, getTopScore, getTotalScore, getProfileCode} = require("./apis/datastoreApi/datastore.api.accessors");
const {getUserId, getDisplayName} = require("./apis/robloxUserApi/robloxUser.api.accessors");
const {response} = require('../helpers/errorHandlers');
const User = require('../models/user.model');

exports.getProfile = async function (playerName) {
    const robloxUserApiResponse = await robloxUserApi.fetch(playerName);
    const playerId = getUserId(robloxUserApiResponse);

    const robloxUserMediaResponse = await robloxUserMediaApi.fetch(playerId);
    const datastoreApiResponse = await datastoreApi.fetch(playerId);
    
    // ! The service interprets accessor data and provides an alternative result if no value exists
    const display = {
        'name': getDisplayName(robloxUserApiResponse),
        'rank': getRank(datastoreApiResponse),
        'img': getImageUrl(robloxUserMediaResponse),
        'topScore': getTopScore(datastoreApiResponse) || 0,
        'totalScore': getTotalScore(datastoreApiResponse) || 0,
        'maps': getMaps(datastoreApiResponse),
    }

    return display;
}

// Backend: To claim a profile is to update modify user data in DB (not in datastore)
exports.claimProfile = async function(userId, playerName, profileCode) {
    return new Promise(async (resolve, reject) => {

    var existingUserData;
    try {
        existingUserData = await User.getById(userId, false);
    } catch (err) {
        // TODO: Define a type for a response object so we know what the type of err is
        reject(response(404, `Can't claim a profile for a user that doesn't exist. DB message: ${err.message}`));
        return;
    }
    
    // 1. Check if user already has claimed a profile
    if (existingUserData.message.playerName != null) {
        reject(response(409, 'User has already claimed a profile. User should unclaim user`s profile first.'));
        return;
    }
    
    
    var robloxUserApiResponse;
    try {
        robloxUserApiResponse = await robloxUserApi.fetch(playerName);
    } catch (err) {
        reject(response(404, `Player does not exist in the datastore. Error: ${JSON.stringify(err.message)}`));
        return;
    }

    // 2. Check if profile code matches player's in-game profile code
    const playerId = getUserId(robloxUserApiResponse);

    const datastoreApiResponse = await datastoreApi.fetch(playerId);
    if (datastoreApiResponse == null) {
        reject(response(404, "Player has not played the game yet"))
        return;
    }

    if (getProfileCode(datastoreApiResponse) != profileCode) {
        reject(response(401, 'Incorrect profile code given. User should log into the game to find the user`s correct profile code'));
        return;
    }
    
    // 3. Claim profile
    const newUserData = new User({userId: userId, playerName: playerName});
    try {
        const dbResult = await User.update(newUserData);
        resolve(response(201, `${userId} has claimed ${playerName}'s profile. Result: ${JSON.stringify(dbResult.message)}`));
    } catch (err) {
        // * business logic error
        if (err.status_code == 409) {
            reject(response(err.status_code, `Another user has already claimed ${playerName}'s profile! DB Error: ${err.message}`));
            return;
        }
        // * generic DB error
        reject(response(err.status_code, `Attempted to claim profile but a database error occurred: ${err.message}`));
    } 
})};

exports.unclaimProfile = async function(userId) {
    const user = new User({userId: userId, playerName: null});

    return new Promise(async (resolve,reject) => {
        try {
            const dbResult = await User.update(user);
            resolve(response(201, `${userId} has unclaimed a profile. Result: ${JSON.stringify(dbResult.message)}`));
        } catch (err) {
            console.log(err);
            reject(response(err.status_code, `Attempted to unclaim profile but a database error occurred: ${err.message}`));
        } 
    })};