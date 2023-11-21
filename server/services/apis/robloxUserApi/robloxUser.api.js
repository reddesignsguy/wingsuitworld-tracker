exports.fetch = async function (playername) {
    var body = {       
        "usernames": [playername],
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
    
    // ! Throw error as close as possible to its origin
    return playerData.json().then(res => {
        if (res.data.length != 0) {
            return res;
        } else {
            const errorMsg = "Player name does not exist";
            console.log(errorMsg);
            throw new Error(errorMsg);
        }
    });
}