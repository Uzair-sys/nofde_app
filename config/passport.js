var passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passportJWT = require("passport-jwt");
const FacebookStrategy = require("passport-facebook").Strategy;

// GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const dotenv = require("dotenv");
dotenv.config();
//User model
const User = require("../models/User");
module.exports = function(passport) {
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromHeader("x-auth-token"),
        secretOrKey: "jwt-secret"
      },
      function(jwtPayload, cb) {
        console.log("JWt Payload"+jwtPayload);
        return User.findOne({
          where: { id: jwtPayload.user.id }
          //attributes: ['id', ['name', 'title']]
        })
          .then(user => {
            if (!user) {
              return cb(null, false, {
                message:
                  "token is not valid please get another token by logging in!"
              });
            }
            //const {password,...result}=user;
            //  console.log('user found!:', user);
            return cb(null, user);
          })
          .catch(err => {
            console.log(err);
            return cb(err);
          });
      }
    )
  );




  //localstrtegy


  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match User
      User.findOne({ where: { email: email } })
        .then(user => {
          // console.log(user);
          if (!user) {
            return done(null, false, {
              message: "invalid username or password"
            });
          }
          //Match Password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            // console.log(password);
            // console.log(user.password);
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "invalid username or passwordzzzz"
              });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );


//facebookstrategy

  passport.use(
    
    FACEBOOK_CLIENT_ID= '1543336789177120',
FACEBOOK_CLIENT_SECRET= '10a8b3ffc6b000b3a5b11fcc95d29271',
    new FacebookStrategy(
     
      {
     
        clientID:FACEBOOK_CLIENT_ID,
        clientSecret:FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/user/facebook/signin/return",
        // profileFields: ["emails", "name", "photos"],
        // enableProof: true
      },
      function async(accessToken, refreshToken, profile, done) {
        console.log("acbacancn");
        const FacebookEmail = profile.emails[0].value;
        const FacebookPhoto = profile.photos[0].value;
        console.log(profile);
        User.findOne({ where: { email: FacebookEmail } }).then(user => { 
          if (user) {
            return done(null,user);
          } else {
            const { givenName, givenInstitute } = profile.name;
            User.create({
              name: givenName,
              institute: givenInstitute,
              email: FacebookEmail,
              password: ""
            })
              .then(newUser => {
                console.log("user successfully created");
                return done(null, newUser);
              })
              .catch(err => {
                console.log("user not save ");
                return done(err);
              });
          }
        });
      }
    )
  );



  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_CLIENT_ID,
  //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //       callbackURL: 'http://localhost:5000/auth/google/signin/return',
  //       profileFields: ['emails', 'name', 'photos']
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       const GoogleEmail = profile.emails[0].value;
  //       console.log(profile);
  //       User.findOne({ where: { email: GoogleEmail } }).then(user => {
  //         if (user) {
  //           return done(null,user);
  //         } else {
  //           const { givenName, familyName } = profile.name;
  //           User.create({
  //             firstname: givenName,
  //             lastname: familyName,
  //             email: GoogleEmail,
  //             source: "google",
  //             //password: "google"
  //           })
  //             .then(newUser => {
  //               console.log("user successfully created");
  //               return done(null, newUser);
  //             })
  //             .catch(err => {
  //               console.log("user not save ");
  //               return done(err);
  //             });
  //         }
  //       });
  //     }
  //   )
  //);
  
};
// module.exports = passport;