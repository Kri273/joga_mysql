// application packages
const express = require('express')
const app = express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars')
// setup template endine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'hbs')
allCookies.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))
// stup static public directory
app.use(express.static('public'));

const mysql = require('mysql2')

const bodyParser = require('body-parser')
app.use = (bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected to joga_mysql db')
})

app.listen(3006, () => {
    console.log('App is started at http://localhost:3006')
})