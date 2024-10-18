// application packages
const express = require('express')
const app = express()

const path = require('path')
// add template engine
const hbs = require('express-handlebars')
// setup template endine directory and files extensions
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))
// stup static public directory
app.use(express.static('public'));

const mysql = require('mysql2')

const bodyParser = require('body-parser');
const { error } = require('console');
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql',
})

con.connect((err) => {
    if (err) throw err;
    console.log('connected to joga_mysql db')
})

app.get('/', (req, res) => {
    let query = "SELECT * FROM article";
    let articles =[]
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index',{
            articles: articles
        })
    })
    
});
   
app.listen(3008, () => {
    console.log('App is started at http://localhost:3008')
})