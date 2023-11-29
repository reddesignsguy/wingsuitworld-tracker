const {buildUserPatchQuery} = require("../helpers/queryBuilders");
const {response} = require("../helpers/errorHandlers");
const mysql = require("mysql2")
// * Constructor
const User = function(user) {
    this.userId = user.userId;
    this.playerName = user.playerName;
}

const connection = mysql.createConnection({
    host: 'localhost',
    port: "3306",
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'ww_mysql'
});

connection.connect();

// * Model promises either a success or failure, the logic is decided here
User.getById = async function(userId) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    };
    
    const query = `SELECT * FROM users WHERE userId = '${userId}' LIMIT 1`;
    return new Promise((resolve, reject) => connection.query(query, (err, rows) => {
        if (err) {
            reject(response(500, "Server failed to find user"))
            return;
        }

        if (rows?.length == 0) {
            reject(response(404, "User does not exist"));
            return;
        }

        resolve(response(200, rows[0]));
    }));
}

// ! When User schema grows, consider a POST function that replaces all columns, i.e: This function would turn into User.create
User.create = async function(user) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }
    
    const query = `INSERT INTO users (userId)
                    VALUES ('${user.userId}')`;
    return new Promise((resolve, reject) => connection.query(query, (err, rows) => {
        if (err?.errno === 1062) {
             reject(response(410, "User already exists"));
             return;
        }

        // TODO: Consider handling other errors that come with SET
        if (err) {
            reject(response(500, "Server failed to create user"));
            return;
        }

        resolve(response(201, user));
    }));
}

User.removeById = async function(userId) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }

    const query = `DELETE FROM users 
                    WHERE userId = '${userId}'`;
    return new Promise((resolve, reject) => connection.query(query, (err, rows) => {
        if (err) { 
            reject(response(500, "Server failed to find user"));
            return;
        }
        
        if (rows?.affectedRows == 0) {
            reject(response(404, "User not removed.. user may not exist"));
            return;
        }
        
        resolve(response(200, userId));
    }));
}


User.update = async function (user){
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }

    const query = buildUserPatchQuery(user);
    return new Promise((resolve, reject) => connection.query(query, (err, rows) => {
        
        if (err) {
            // console.log(err);
            reject(response(500, "Server failed to update playerName of user")); 
            return;
        };

        if (rows?.affectedRows == 0) {
            reject(response(404, "Could not find provided user id"));
            return; 
        }
        
        if (rows?.changedRows == 0) {
            response(404, "User was found but not updated; The user specified may already contain the data provided");
            return;
        }

        resolve(response(200, user));
    }));
}

module.exports = User;