// application packages
const express = require("express");
const app = express();

const path = require("path");
// add template engine
const hbs = require("express-handlebars");
// setup template endine directory and files extensions
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts",
  })
);
// stup static public directory
app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const con = require("./utils/db");
const articleRoutes = require("./routes/article");
const authorRoutes = require("./routes/author");

app.get("/favicon.ico", (req, res) => res.status(204));

// to use article routes
app.use("/", articleRoutes);
app.use("/article", articleRoutes);
app.use("/author", authorRoutes);

app.listen(3006, () => {
  console.log("App is started at http://localhost:3006");
});
