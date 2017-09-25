//  createUser.js

var User = require("./models/User.js");

const mongoose = require("mongoose");
const configDB = require ("./dbConfig.js");
mongoose.connect(configDB.url);

function createUser(email, password){
    User.findOne({ "local.email": email}, (err, user) => {
        if(err) return done(err);

        if(user){
            console.log("The email is already taken.")
            return false;
        }else{
            var newUser = new User();

            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            newUser.save( (err) => {
                if(err) throw err;

                return false;
            });
        }
    });
}

createUser(process.argv[2], process.argv[3]);