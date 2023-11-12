DROP DATABASE ww_mysql;
CREATE DATABASE ww_mysql;

USE ww_mysql;

CREATE TABLE users(
    userId VARCHAR(50) PRIMARY KEY,
    playerName VARCHAR(50)
);

INSERT INTO users
VALUES (123, 'test');

SELECT * FROM users;