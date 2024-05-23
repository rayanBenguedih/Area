const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../config/db');

passport.serializeUser((user, cb) => {
    cb(null, user)
});

passport.deserializeUser((user, cb) => {
    cb(null, user)
});

passport.use(new LocalStrategy((username, password, cb) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err)
            return cb(err);
        if (results.length == 0)
            return cb(null, false, {message: 'Incorrect username.'});
        bcrypt.compare(password, results[0].password, (compareErr, isValid) => {
            if (compareErr)
                return cb(compareErr);
            if (!isValid)
                return cb(null, false, { message: 'Incorrect username or password.' });
            return cb(null, {id: results[0].id, username: results[0].username, email: results[0].email});
        });
    });
}));