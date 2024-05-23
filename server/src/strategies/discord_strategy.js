const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
require('dotenv').config({path: `./${process.env.APP_ENV}.env`});

passport.use(new DiscordStrategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_SECRET,
        callbackURL: "http://localhost:8080/api/auth/discord/redirect",
        scope: ['identify', 'email'],
        passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, cb) => {
        db.query('UPDATE users SET discordUserId=? WHERE id=?', [profile.id, req.user.id], (err) => {
            if (err)
                return cb(err);
            return cb(null, req.user);
        });
    }
));