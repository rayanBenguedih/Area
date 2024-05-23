// const express = require("express");
// const axios = require("axios");
// const passport = require('passport');
// const db = require('../../config/db');
// const BearerStrategy = require('passport-http-bearer');

// const mobileAuthRouter = express.Router();

// mobileAuthRouter.get('/google', passport.authenticate('bearer', { session: false}),
//     (req, res) => {
//         // res.json(req.user);
//     }
// );

// passport.use(new BearerStrategy({
//         passReqToCallback: true
//     },
//     (req, token, cb) => {
//         axios.get("https://www.googleapis.com/userinfo/v2/me", {
//             headers: {Authorization: `Bearer ${token}`}
//         }).then((res) => {
//             if (!res)
//                 return cb(null, false);
//             db.query('SELECT * FROM users WHERE provider=? AND providerUserId=? AND email=?', ["google", res.data.id, res.data.email], (err, results) => {
//                 if (err)
//                     return cb(err);
//                 if (results.length == 0) {
//                     const uuid = uuidv4();
//                     db.query(`INSERT INTO users (id, username, email, provider, providerUserId) VALUES (?, ?, ?, ?, ?)`, [uuid, `${res.data.given_name} ${res.data.family_name}`, res.data.email, "google", res.data.id], (err) => {
//                         if (err)
//                             return cb(err);
//                         return cb(null, {id: uuid, username: `${profile.name.givenName} ${profile.name.familyName}`, email: profile.emails[0].value});
//                     });
//                 } else
//                     return cb(null, {id: results[0].id, username: `${profile.name.givenName} ${profile.name.familyName}`, email: profile.emails[0].value});
//             });
//         }).catch((err) => {
//             return cb(err);
//         });
//         // return cb(null, user, { scope: 'all' });
//     }
// ));

// module.exports = mobileAuthRouter;




const express = require("express");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { v4: uuidv4 } = require('uuid');
const db = require('../../config/db');
require('dotenv').config({path: `./${process.env.APP_ENV}.env`});

const mobileAuthRouter = express.Router();

mobileAuthRouter.get('/google', passport.authenticate('googlemobile', {scope: ['profile', 'email'], session: true}));

passport.use('googlemobile', new GoogleStrategy({
        clientID: '395384157614-0vdd0rmrgjrv76v0a770c3mrsa1hg8b1.apps.googleusercontent.com',
        // clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "com.canopuscarinae2662.mapp://"
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

module.exports = mobileAuthRouter;