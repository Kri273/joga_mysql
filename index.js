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

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))


const con = require('./utils/db'); // Import the database connection
const articleRoutes = require('./routes/article'); // import article route
const { resourceLimits } = require('worker_threads');

// to use article routes
app.use('/', articleRoutes);
app.use('/article', articleRoutes);

// Show all author articles
app.get('/author/:author_id', (req, res) => {
    const authorId = req.params.author_id;
    const authorQuery = `SELECT * FROM author WHERE id=${authorId}`;
    
    con.query(authorQuery, (err, authorResult) => {
        if (err) throw err;

        const author = authorResult[0];
        const articlesQuery = `SELECT * FROM article WHERE author_id=${authorId}`;
        con.query(articlesQuery, (err, articlesResult) => {
            if (err) throw err;

            res.render('author', {
                author: author,
                articles: articlesResult
            });
        });
    });
});
 
app.listen(3005, () => {
    console.log('App is started at http://localhost:3005')
})