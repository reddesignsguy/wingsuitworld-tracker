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

User.getById = async function(userId) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    };
    
    const query = `SELECT * FROM users WHERE userId = '${userId}' LIMIT 1`;
    connection.query(query, (err, rows) => {
        if (err) return err;

        if (rows.length == 0) {
            return JSON.stringify(null);
        }
         else {
            return rows;
         }
    });
}

// ! When User schema grows, consider a POST function that replaces all columns, i.e: This function would turn into User.create
User.createById = async function(user) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }
    
    const query = `INSERT INTO users (userId)
                    VALUES ('${user.userId}')`;
    // TODO: 0 Rows are returned even on successful POST
    connection.query(query, (err, rows) => {
        if (err) return err;

        if (rows.length == 0) {
            return JSON.stringify(null);
        }
         else {
            return JSON.stringify(rows);
         }
    });
}

User.removeById = async function(userId) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }

    const query = `DELETE FROM users 
                    WHERE userId = '${userId}'`;
    connection.query(query, (err, rows) => {
        if (err) return err;

        if (rows.length == 0) {
            return JSON.stringify(null);
        }
         else {
            return JSON.stringify(rows.info);
         }
    });
}


User.update = async function (user){
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }
    // ! This query builder is modular and works for any patch or put request
    const query = buildUserPatchQuery(user);
    return new Promise((resolve) => connection.query(query, (err, rows) => {
        if (err) {
            resolve(err); 
            return;
        };

        if (rows.affectedRows == 0 ) {
            resolve("Could not find provided user id");
        } else if (rows.changedRows == 0) {
            resolve("The data of the user of the provided userId not changed");
        }
         else {
            resolve(user);
         }
    }));
}

module.exports = User;