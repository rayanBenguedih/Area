const passport = require('passport');
const TwitchStrategy = require('@d-fischer/passport-twitch').Strategy;
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
require('dotenv').config({path: `./${process.env.APP_ENV}.env`});

passport.use(new TwitchStrategy({
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/auth/twitch/redirect",
        scope: ['user_read'],
        passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, cb) => {
        db.query('UPDATE users SET twitchUserId=? WHERE id=?', [profile.id, req.user.id], (err) => {
            if (err)
                return cb(err);
            return cb(null, req.user);
        });
    }
));