const express = require("express")
const playerRoutes = express.Router(); 

require('dotenv').config();

// Get player datastore
playerRoutes.get('/:player_name', async function(req, res) {
    const playerId = await getIdFromPlayerName(req.params.player_name);
    const imageData = await getImage(playerId);
    const playerProfile = await getWingsuitSimulatorProfile(playerId);
    
    // TODO: Accessor functions for data
    // TODO: Fulfill rank, totalScore, and maps
    const display = {
        'name': req.params.player_name,
        'rank': 3,
        'img': imageData[0].imageUrl,
        'topScore': playerProfile ? playerProfile.Data.SkillPoints : 0,
        'totalScore': playerProfile ? playerProfile.Data.SkillPoints : 0,
        'maps': [      
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
          }]
    }

    res.json(display);
});

async function getWingsuitSimulatorProfile(user_id) {
    try {
    var headers = {
        'x-api-key': process.env.DATASTORE_API_KEY,
    }

    const profileData = await fetch(`${process.env.DATASTORE_API}?datastoreName=${process.env.DATASTORE_NAME}&entryKey=Player_${user_id}`, {
        method: "GET",
        headers: headers,
    });
    

    return profileData.json().then(res => {if (res.error) {
return null;
    } else {
        return res;
    }
});
    } catch (error) {
        console.log('failed to call datastore api: ', error);
        return null;
    }
}

// TODO: Separate data fetching from data parsing
async function getImage(user_id) {
    const data = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${[user_id]}&size=352x352&format=Png&isCircular=false`)

    return data.json().then(res => res.data);
}

// TODO Change player data to just data
async function getIdFromPlayerName(playername) {
    var body = {       
        "usernames": [
            playername
        ],
      "excludeBannedUsers": true
    }
 

    const playerData = await fetch(process.env.NAME_TO_ID_API, {
        method: "POST",
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    });
    
    
    return playerData.json().then(res => res.data[0].id);
}

module.exports = playerRoutes; 