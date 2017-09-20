//  Routes.js

const path = require("path");
const ObjectId = require("mongodb").ObjectID;

module.exports = function setupRoutes(app, db){
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname + "/web/search.html"));
    });
    
    app.get("/addNote", (req, res) => {
        res.sendFile(path.join(__dirname + "/web/addNote.html"));
    });

    app.get("/updateNote", (req, res) => {
        res.sendFile(path.join(__dirname + "/web/updateNote.html"));
    })
    
    app.post("/api/notes", (req, res) => {
        let body = req.body;

        if(body._id){
            console.log("Updating Note...");
            db.collection("notes")
                .update(body, 
                    (err, result) => {
                        if(err) console.log(err);
        
                        console.log("Save successful.")
                        res.send({ id: result._id, message: "Save successful" });
                    }
            );
        }else{
            console.log("Inserting Note...");
            body.dateCreated = new Date();
            db.collection("notes")
                .insert(body, 
                    (err, result) => {
                        if(err){
                            console.log(err);
                            res.status(500).send({message: "Database error."});
                        } 
        
                        console.log("Save successful.");
                        res.send({redirect: "/updateNote?noteId=" + body._id});
                    }
            );
        }

        
    });

    app.get("/api/notes/:id", (req, res) => {
        console.log(req.params.id);
        let cursor = db.collection("notes").find(
            {
                "_id": ObjectId(req.params.id)
            }
        ).toArray( (err, results) => {
            if(err){
                console.log("Database error.");
                console.log(err);
                res.status(500).send("Database error.");
                return;
            }

            if(results.length === 0){
                console.log("Note not found")
                res.status(404).send("Note not found.");
                return;
            }

            res.send({note: results[0]});
        });
    });
    
    app.get("/api/notes", (req, res) => {
        const query = req.query;
    
        let findString = ".*var.*";
        findString = findString.replace("var", query);
    
        let cursor = db.collection("notes").find(
            {   
                $or: [
                    {
                        "title": { "$regex": findString }
                    },
                    { 
                        "tags": [query]
                    }
                ]
            }
        ).toArray( (err, results) => {
            if(err) res.status(500).send("Database error");
    
            let hash = {};
            const distinctResults = results.filter( (item) => {
                return hash.hasOwnProperty(item._id) ? false : (hash[item._id] = true);
            });
    
            res.send({notes: distinctResults});
        });
    });
}
