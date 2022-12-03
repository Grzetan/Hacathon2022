const express = require('express');
const bcrypt = require("bcrypt");
const app = express()
const port = 3000
var bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

app.use(bodyParser.json());
app.use(cookieParser());

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'timeOut'
})

connection.connect()

app.get("/db_setup", (req, res) => {
    connection.query('DROP TABLE IF EXISTS users;', (err, rows, fields) => {
        if (err){
            res.status(500).send("Internal DB error");
            throw err
        }
    })

    connection.query('CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(255), password TEXT, email VARCHAR(255));', (err, rows, fields) => {
        if (err){
            res.status(500).send("Internal DB error");
            throw err
        }
    })

    res.status(200).send("DB successfull created");
});

app.post('/register', (req, res)=>{
    if(!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password") || !req.body.hasOwnProperty("email")){
        res.status(400).send("Request does not have enough data");
        return;
    }

    if(req.body.username == '' || req.body.password == '' || req.body.email == ''){
        res.status(400).send("Some data is missing");
        return;
    }

    connection.query(`SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}';`, (err, rows, fields) => {
        if (err){
            res.status(500).send("Internal DB error");
            throw err
        }
        if(Object.keys(rows).length != 0){
            res.status(400).send("There already is an user with that username of email");
            return;
        }
    })

    // Hash password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            connection.query(`INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hash}');`, (err, rows, fields) => {
                if (err){
                    res.status(500).send("Internal DB error");
                    throw err
                }
                res.status(200).send("Successfully created an account");
            })
        });
    })
})

app.post('/login', (req, res)=>{
    if(!req.body.hasOwnProperty("login") || !req.body.hasOwnProperty("password")){
        res.status(400).send("Request does not have enough data");
        return;
    }

    if(req.body.login == '' || req.body.password == ''){
        res.status(400).send("Some data is missing");
        return;
    }

    connection.query(`SELECT * FROM users WHERE username = '${req.body.login}' OR email = '${req.body.login}';`, (err, rows, fields) => {
        if (err){
            res.status(500).send("Internal DB error");
            throw err
        }
        if(Object.keys(rows).length == 0){
            res.status(400).send("Wrong login or password");
            return;
        }

        bcrypt.compare(req.body.password, rows[0].password, function(err, result) {
            if (!result) {
                res.status(400).send("Wrong login or password");
                return 
            }
            res.cookie("userId", rows[0].id);
            res.status(200).send("Successfully logged in");
        });
    })
})

app.get("/logout", (req, res) => {
    res.cookie('userId', '');
    res.end();
});

app.get("/", (req, res) => {
    console.log(req.cookies);
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});