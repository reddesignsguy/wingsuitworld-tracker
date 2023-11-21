exports.fetch = async function (user_id) { // TODO Try catch
    const res = await fetch(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${[user_id]}&size=352x352&format=Png&isCircular=false`);
    return res.json().then(res => {
        if (res.length != 0) {
            return res;
        } else {
            const errorMsg = "Image url does not exist";
            console.log(errorMsg);
            throw new Error(errorMsg);
        }
    })
}