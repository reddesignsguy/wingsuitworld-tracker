const express = require('express');
const userRoutes = express.Router();
const mysql = require('mysql2');
const { connect } = require('./players');

const connection = mysql.createConnection({
    host: 'localhost',
    port: "3306",
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'ww_mysql'
});

connection.connect();

// TODO: Apply DRY
userRoutes.get('/:userId', function(req,res) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    };
    
    const query = `SELECT * FROM users WHERE userId = '${req.params.userId}'`;
    connection.query(query, (err, rows, fields) => {
        if (err) res.send(err);

        if (rows.length == 0) {
            res.send(JSON.stringify(null));
        }
         else {
            res.json(rows);
         }
    });
});

// TODO Error handling
userRoutes.post(("/"), function(req,res) {
    if (connection.state === 'disconnected') {
        return respond(null, {status: 'fail', message: 'failed to connect to db'});
    }

    console.log(req.body)
    
    const query = `INSERT INTO users (userId)
                    VALUES ('${req.body.userId}')`;
    connection.query(query, (err, rows, fields) => {
        if (err) res.send(err);

        if (rows.length == 0) {
            res.send(JSON.stringify(null));
        }
         else {
            res.json(rows);
         }
    });
});

userRoutes.delete('/:user'), function(req, res) {

};

userRoutes.put('/:user', function(req, req) {

});



module.exports = userRoutes;