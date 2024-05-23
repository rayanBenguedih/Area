const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
require('dotenv').config({path: `./${process.env.APP_ENV}.env`});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:8080/api/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, cb) => {
        db.query('SELECT * FROM users WHERE provider=? AND providerUserId=? AND email=?', ["google", profile.id, profile.emails[0].value], (err, results) => {
            if (err)
                return cb(err);
            if (results.length == 0) {
                const uuid = uuidv4();
                db.query(`INSERT INTO users (id, username, email, provider, providerUserId) VALUES (?, ?, ?, ?, ?)`, [uuid, `${profile.name.givenName} ${profile.name.familyName}`, profile.emails[0].value, "google", profile.id], (err) => {
                    if (err)
                        return cb(err);
                    return cb(null, {id: uuid, username: `${profile.name.givenName} ${profile.name.familyName}`, email: profile.emails[0].value});
                });
            } else
                return cb(null, {id: results[0].id, username: `${profile.name.givenName} ${profile.name.familyName}`, email: profile.emails[0].value});
        });
    }
));