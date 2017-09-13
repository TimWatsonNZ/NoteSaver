const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); 

const uuidv1 = require("uuid/v1");

const MongoClient = require("mongodb").MongoClient;

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

    app.listen(port, () => {
        console.log("Listening on " + port);
    });
});

app.use("/bundles", express.static(__dirname + "/web/bundles"));
app.use("/css", express.static(__dirname + "/css"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/web/search.html"));
});

app.get("/addNote", (req, res) => {
    res.sendFile(path.join(__dirname + "/web/addNote.html"));
});

app.post("/api/notes", (req, res) => {
    let body = req.body;

    db.collection("notes")
      .save({"title": body.title, "text": body.text, "tags": body.tags}, 
            (err, result) => {
                if(err) console.log(err);

                res.send(result._id);
            }
    );
});

app.get("/api/notes", (req, res) => {
    const query = req.query;

    let findString = ".*var.*";
    findString = findString.replace("var", query);

    console.log(findString);

    let cursor = db.collection("notes").find(
        { 
            "title": { "$regex": findString },
            "tags": { "$all": [...query]} 
        }
    ).toArray( (err, results) => {
        if(err) res.send();

        console.log(results);

        if(results) res.send({notes: results});
    });
});
