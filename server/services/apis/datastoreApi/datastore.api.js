exports.fetch = async function (playerId) {
    try {
    var headers = {
        'x-api-key': process.env.DATASTORE_API_KEY,
    }

    const res = await fetch(`${process.env.DATASTORE_API}?datastoreName=${process.env.DATASTORE_NAME}&entryKey=Player_${playerId}`, {
        method: "GET",
        headers: headers,
    });
    
        return res.json().then(res => {
            if (res.error) {
                const errorMsg = "Data store not found for player";
                console.log(errorMsg);
                return null;
            } else {
                return res;
            }
        })

    } catch (error) {
        console.log('failed to call datastore api: ', error);
        return null;
    }
}

// // ! This may be replaced with a generic update function
// exports.updateProfileOwnerByPlayerId = (playerId, userId) => {
//     try {
//         var headers = {
//             'x-api-key': process.env.DATASTORE_API_KEY,
//             'content-type': 'application/json',
//             'roblox-entry-attributes' : {profileOwner: userId},
//         }

//         const res = await fetch(`${process.env.DATASTORE_API}?datastoreName=${process.env.DATASTORE_NAME}&entryKey=Player_${playerId}`, {
//             method: "POST",
//             headers: headers,
//         });

//         return res.json().then(res => {
//             if (res.error) {
//                 const errorMsg = "Data store not found for player";
//                 console.log(errorMsg);
//                 throw new Error(errorMsg);
//             } else {
//                 return res;
//             }
//         })


//     } catch (err) {
//         console.log('failed to call datastore api: ', error);
//         return null;
//     }
// }