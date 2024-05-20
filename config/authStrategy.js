// import passport , bcrypt , and local strategy
const passport = require("passport");
const bcrypt = require("bcrypt");

const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../model/userModel");

//take passport to use local strategy created to sears for username

passport.use(
  new LocalStrategy(
    (verify = (username, password, done) => {
      // look for username in model and if found compare password if not found return message there was en error finding account
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          //use bcrypt to compare password and return result
          bcrypt.compare(password, user.password, (error, result) => {
            //console.log("result", result);
            if (error) {
              // if error password does not match then return done
              return done(error);
            }
            return done(null, user); //if match return user
          });
        })
        .catch((error) => {
          console.log(`There was an error finding user from database ${error}`);
        });
    })
  )
);

//use local google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
