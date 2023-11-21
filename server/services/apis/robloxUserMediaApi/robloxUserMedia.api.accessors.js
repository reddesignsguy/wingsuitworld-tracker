exports.getImageUrl = function (robloxUserMediaApiResponse) {
    return robloxUserMediaApiResponse.data?.[0]?.imageUrl;
}