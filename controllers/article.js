// import db connection
const con = require('../utils/db')

//show all articles - index page
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index',{
            articles: articles
        })
    })
};


// Show article by this slug
const getArticleBySlug = (req, res) => {
    const articleQuery = `SELECT * FROM article WHERE slug="${req.params.slug}"`;
    con.query(articleQuery, (err, articleResult) => {
        if (err) throw err;

        // Check if an article is found
        if (articleResult.length > 0) {
            const article = articleResult[0];
            
            // Check if article has an author_id before querying
            if (article.author_id) {
                const authorQuery = `SELECT name FROM author WHERE id=${article.author_id}`;
                con.query(authorQuery, (err, authorResult) => {
                    if (err) throw err;
                    
                    // Set authorName and attach it to the article
                    const authorName = authorResult.length > 0 ? authorResult[0].name : 'Unknown Author';
                    article.authorName = authorName;
                    
                    // Render the article view with article and author data
                    res.render('article', {
                        article: article
                    });
                });
            } else {
                // Render without author if author_id is missing
                article.authorName = 'Unknown Author';
                res.render('article', {
                    article: article
                });
            }
        } else {
            // Handle case where no article is found
            res.status(404).send('Article not found');
        }
    });
};

const getAuthorById = (req, res) => {
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
};

    // export controller functions
    module.exports = {
        getAllArticles,
        getArticleBySlug,
        getAuthorById
    };