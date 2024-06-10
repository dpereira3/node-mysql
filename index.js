const express = require('express');
const mysql = require('mysql2')
const fs = require('fs')

const app = express();


// create connection

/* const db = mysql.createConnection({
    debug: true,
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    flags: 'ssl-mode='+process.env.SSL_MODE,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(__dirname + "/instance/ca.pem").toString(),
    }
}); */

const db = mysql.createConnection(process.env.STRING)

// connect
db.connect((err) => {
    if(err) throw err;
    console.log('mysql connected...');
});

// Create DB
app.get('/createdb', (req, res) =>{
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('database created...');
    })
})

// Create Table
app.get('/createPostTable', (req, res) => {
    let sql = 'CREATE TABLE Posts (id int Auto_increment primary key, title varchar(255), body varchar(255))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('posts table created...');
    })
})

// Insert post 1
app.get('/addPost1', (req, res) => {
    let Post = {title: 'post two', body: 'this is post number two'};
    let sql = 'INSERT INTO Posts set ?';
    let query = db.query(sql, Post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post 1 added...')
    })
})

// Select Posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM Posts';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('posts featched...')
    })
})

// Select Single Post
app.get('/getPost/:id', (req, res) => {
    let sql = `SELECT * FROM Posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Post ${req.params.id} featched...`)
    })
})

// Update Post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'updated title';
    let sql = `UPDATE Posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send('Post updated..');
    })
})

// Delete single Post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM Posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) =>{
        if(err) throw err;
        console.log(result);
        res.send(`Post ${req.params.id} deleted..`);
    })
})

app.listen('3000', () => console.log('server started'));