const express = require("express");
const bodyParser = require("body-parser");

const uuidv1 = require("uuid/v1");

const MongoClient = require("mongodb").MongoClient;
const routes = require("./Routes.js");

const port = process.env.PORT || 8080;


const configDB = require ("./dbConfig.js");
const Note = require("./models/Note.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.use("/bundles", express.static(__dirname + "/web/bundles"));
app.use("/css", express.static(__dirname + "/web/css"));
app.use("/js", express.static(__dirname + "/web/js"));


