// api.com/profile
exports.getProfile = async function (playername) {
  const res = await fetch(`http://localhost:5051/profile/${playername}`);
  // TODO: 1. Handle no player found
  // TODO: 3. Handle loading state (there's probably a standardized way of doing this)
  console.log(res);
  if (res.ok) {
    return res.json().then((data) => {
      return data;
    });
  } else {
    return null;
  }
};

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
    return res.json().then((data) => data);
  } else {
    return null;
  }
};

exports.unclaimProfile = async function (userId) {
  const data = { userId: userId };
  const res = await fetch(`http://localhost:5051/profile/unclaim`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return res.json().then((data) => data);
  } else {
    return null;
  }
};

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
};

exports.getUserById = async function (userId) {
  var res = await fetch(`http://localhost:5051/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json().then((data) => data);
  } else {
    return null;
  }
};
