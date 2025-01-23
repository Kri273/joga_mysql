// import db connection
const con = require("../utils/db");

const getAuthorById = (req, res) => {
  const authorId = parseInt(req.params.author_id);
  const authorQuery = `SELECT * FROM author WHERE id=${authorId}`;

  console.log(authorQuery);

  con.query(authorQuery, (err, authorResult) => {
    if (err) throw err;

    const author = authorResult[0];
    const articlesQuery = `SELECT * FROM article WHERE author_id=${authorId}`;
    con.query(articlesQuery, (err, articlesResult) => {
      if (err) throw err;

      res.render("author", {
        author: author,
        articles: articlesResult,
      });
    });
  });
};

// export controller functions
module.exports = {
  getAuthorById,
};
