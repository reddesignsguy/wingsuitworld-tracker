const datastoreApi = require("../../apis/datastoreApi/datastore.api")
const robloxUserApi = require("../../apis/robloxUserApi/robloxUser.api");
const robloxUserMediaApi = require("../../apis/robloxUserMediaApi/robloxUserMedia.api")
const {getImageUrl} = require("../../apis/robloxUserMediaApi/robloxUserMedia.api.accessors") // TODO Change to import statement
const {getRank, getMaps, getTopScore, getTotalScore} = require("../../apis/datastoreApi/datastore.api.accessors");
const {getUserId, getDisplayName} = require("../../apis/robloxUserApi/robloxUser.api.accessors");
// ! Accessors should worry about what the front-end user is going to see! It should always return some kind of intelligible data

exports.getProfile = async function (playername) {


    const robloxUserApiResponse = await robloxUserApi.fetch(playername);
    const playerId = getUserId(robloxUserApiResponse);

    const robloxUserMediaResponse = await robloxUserMediaApi.fetch(playerId);
    const datastoreApiResponse = await datastoreApi.fetch(playerId);

    // ! Display should not have to worry about handling logic! It only lays out the info it has!
    // ! This is why datastoreApiAccessors (and other accessors) handles null data!
    
    const display = {
        'name': getDisplayName(robloxUserApiResponse),
        'rank': getRank(datastoreApiResponse),
        'img': getImageUrl(robloxUserMediaResponse),
        'topScore': getTopScore(datastoreApiResponse),
        'totalScore': getTotalScore(datastoreApiResponse),
        'maps': getMaps(datastoreApiResponse),
    }

    return display;
}