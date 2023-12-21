// api.com/profile
exports.claimProfile = async function (userId, playerName, profileCode) {
    const data = {
      userId: userId,
      playerName: playerName,
      profileCode: profileCode,
    };
  
    // TODO Refactor and call from apis
    var res = await fetch(`http://localhost:5051/profile/claim`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return true;
    } else {
      return false;
    }
  }

  // api.com/user
  exports.getUserByPlayername = async function (playerName) {
    var res = await fetch(`http://localhost:5051/user/playername/${playerName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (res.ok) {
      return res;
    } else {
      return null;
    }
  }

  exports.getUserById = async function(userId) {
    console.log("calling because data not in cache")
    var res = await fetch(`http://localhost:5051/user/${userId}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return res.json().then(data => data);
    } else {
      return null;
    }
  }