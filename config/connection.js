const mysql = require('mysql2');
require('dotenv').config();

//Create a MySQL connection
const db = mysql.createConnection(
    {
       database: process.env.DB_NAME,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       host: process.env.DB_HOST

    },
    console.log('Connected to database!')
);

module.exports =db;

