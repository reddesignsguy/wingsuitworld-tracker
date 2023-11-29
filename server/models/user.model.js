const {buildUserPatchQuery} = require("../helpers/queryBuilders");
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
            reject({status_code: 500, message: "Server failed to find user"})
            return;
        }

        if (rows?.length == 0) {
            reject({status_code: 404, message: "User does not exist"})
            return;
        }

        resolve(rows);
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
             reject({status_code: 410, message: "User already exists"})
             return;
        }

        // TODO: Consider handling other errors that come with SET
        if (err) {
            reject({status_code: 500, message: "Server failed to create user"});
            return;
        }

        resolve(user);
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
            reject({status_code: 500, message: "Server failed to find user"})
            return;
        }
        
        if (rows?.affectedRows == 0) {
            reject({
                status_code: 404,
                message: "User not removed.. user may not exist"});
            return;
        }

        
        resolve(`${userId} was removed`);
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
            reject({status_code: 500, message: "Server failed to update playerName of user"}); 
            return;
        };

        if (rows?.affectedRows == 0) {
            reject({
                status_code: 404,
                message: "Could not find provided user id"});
            return; 
        }
        
        if (rows?.changedRows == 0) {
            reject({
                status_code: 404,
                message: "The user specified may already contain the data provided"});
            return;
        }
        resolve(user);
    }));
}

module.exports = User;