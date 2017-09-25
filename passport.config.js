//  passport.config.js

var LocalStrategy = require("passport-local").Strategy;

 var User = require("./models/User.js")

 module.exports = (passport) => {
     passport.serializeUser( (user, done) => {
        done(null, user.id);
     });

     passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
     });

    passport.use("local-login", 
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User.findOne({"local.email": email}, (err, user) => {
                if(err)
                    return done(err);

                if(!user)
                    return done(null, false, req.flash("loginMessage", "No user found."));

                if(!user.validPassword(password))
                    return done(null, false, req.flash("loginMessage", "Opps! Wrong password."));

                return done(null, user);
            });
        }
    ));
 }

