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