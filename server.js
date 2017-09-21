const express = require("express");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");
const MongoClient = require("mongodb").MongoClient;
const routes = require("./Routes.js");
const configDB = require ("./dbConfig.js");
const Note = require("./models/Note.js");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const port = process.env.PORT || 8080;

const app = express();

let db;

MongoClient.connect(configDB.url, (err, database) => {
    if(err) return console.log(err);

    db = database;
    console.log("Database connected");

    routes(app, db);

    app.listen(port, () => {
        console.log("Listening on " + port);
    });
});

mongoose.connect(configDB.url);

require("./passport.config")(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: "ilovescotchscotchyscotchscotch"}));
app.use(passport.initialize());
app.use(passport.session());
app.user(flast());

app.use("/bundles", express.static(__dirname + "/web/bundles"));
app.use("/css", express.static(__dirname + "/web/css"));
app.use("/js", express.static(__dirname + "/web/js"));


