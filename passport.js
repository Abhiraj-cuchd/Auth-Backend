const passport = require('passport');
const User = require('./Model/User.Model');
const dotenv = require('dotenv');


dotenv.config();

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStratergy = require('passport-github2').Strategy;
  

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {

        done(null, profile);

        User.findOne({ googleId: profile.id }).then((err, user) => {
            if (err) return done(err);

            if (!user) {
                const tenderUser = {
                    username: profile.displayName,
                    avatar: profile.photos[0].value,
                    googleId: profile.id
                };

                const newUser = new User(tenderUser)

                newUser.save().then((err) => {
                    if (err) return done(err);
                    return done(null, newUser)
                }).catch((err) => {
                    return done(err)
                })
            } else {
                return done(null, user);
            }
        }).catch((err) => {
            return done(err)
        })
    }
    ));

    passport.use(new GithubStratergy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
        function (accessToken, refreshToken, profile, done) {
    
            done(null, profile);
    
            User.findOne({ googleId: profile.id }).then((err, user) => {
                if (err) return done(err);
    
                if (!user) {
                    const tenderUser = {
                        username: profile.username,
                        avatar: profile.profileUrl,
                        googleId: profile.id
                    };
    
                    const newUser = new User(tenderUser)
    
                    newUser.save().then((err) => {
                        if (err) return done(err);
                        return done(null, newUser)
                    }).catch((err) => {
                        return done(err)
                    })
                } else {
                    return done(null, user);
                }
            }).catch((err) => {
                return done(err)
            })
        }
        ));

passport.serializeUser((user, done) => {
    done(null, user)
});


passport.deserializeUser((user, done) => {
    done(null, user)
});
