exports.getTopScore = function(datastoreApiResponse) { // TODO assert that this doesnt return null
    return datastoreApiResponse?.Data?.SkillPoints;
}

exports.getTotalScore = function(datastoreApiResponse) {
    return datastoreApiResponse?.Data?.SkillPoints;
}

exports.getRank = function(datastoreApiResponse) {
  // TODO Fetch actual rank
    return 3;
}

exports.getMaps = function(datastoreApiResponse) {
  // TODO: Remove in prod
  if (datastoreApiResponse?.UserIds?.[0] != "24052998") return [];

    return [      
        {
        title: "City Parkour",
        plays: 5839,
        img: "https://play-lh.googleusercontent.com/COYAd2-J_5uJHVMm2GYrBoSqSN3m4q1FV5rXDZAR_TIKju28FYA_wpNZphZqordE0w",
        code: "cp#9943",
      }, 
      {
        title: "Lava Land",
        plays: 2239,
        img: "https://en.tankiwiki.com/images/en/c/cb/Texture_Lava.jpg",
        code: "lavaland#1922",
      }, 
      {
        title: "Mike's Mountain",
        plays: 122,
        img: "https://pics.craiyon.com/2023-07-10/11c8816e9311478580ac56aefc62e30f.webp",
        code: "testing#2232",
      }];
}

exports.getProfileCode = function(datastoreApiResponse) {
  return datastoreApiResponse?.Data?.ProfileCode;
}