exports.getUserId = function (robloxUserApiResponse) {
    return robloxUserApiResponse.data?.[0]?.id;
}

exports.getDisplayName = function (robloxUserApiResponse) {
    return robloxUserApiResponse.data?.[0]?.name;
}