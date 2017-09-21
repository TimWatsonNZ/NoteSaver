//  models/user.js

var mongoose = require("mongoose");
var byrcrypt = require("bcrypt-js");

var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    }
});

userSchema.methods.generateHash = (password) => {
    return byrcrypt.hashSync(password, byrcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password){
    return byrcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model("User", userSchema);