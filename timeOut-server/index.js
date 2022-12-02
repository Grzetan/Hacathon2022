const express = require('express');
const bcrypt = require("bcrypt");
const app = express()
const port = 3000
var bodyParser = require("body-parser");

app.use(bodyParser.json());


const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'timeOut'
})

connection.connect()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/db_setup", (req, res) => {
    connection.query('DROP TABLE IF EXISTS users;', (err, rows, fields) => {
        if (err){
            res.status(500).send("Internal DB error");
            throw err
        }
    })

    connection.query('CREATE TABLE users(username VARCHAR(255), password TEXT, email VARCHAR(255));', (err, rows, fields) => {
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

    connection.query(`INSERT INTO users (username, email, password) VALUES ('${req.body.username}', '${req.body.email}', '');`, (err, rows, fields) => {
        if (err){
            res.status(500).send("Internal DB error");
            throw err
        }
        res.status(200).send("Successfully created an account");
    })
    
})

app.get('/db', (req,res) => {
    
    connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
      if (err) throw err
    
      res.send('The solution is: ' + rows[0].solution)
    })

})

app.listen(port, () => {
 console.log("XD");
});