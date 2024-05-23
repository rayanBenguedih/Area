const express = require("express");
const db = require('../../config/db.js');
const authMiddleware = require('../../middleware/auth_middleware');

const usersRouter = express.Router();

usersRouter.use(authMiddleware);

usersRouter.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.status(200).send(results);
    });
});

usersRouter.get('/:selector', (req, res) => {
    db.query('SELECT * FROM users WHERE id=? OR username=?', [req.params.selector, req.params.selector], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.status(200).send(results);
    });
});

usersRouter.post('/', (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.username)
        return res.status(400).send({msg: `One or more fields are missing in request body.`});
    db.query(`INSERT INTO users (email, password, username) VALUES (?, ?, ?)`, [req.body.email, req.body.password, req.body.username], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.status(201).send({msg: `User with email '${req.body.email}' created.`});
    });
});

usersRouter.delete('/', (req, res) => {
    if (!req.body.email)
        return res.status(400).send({msg: `Field 'email' is missing in request body.`});
    db.query(`DELETE FROM users WHERE email=?`, [req.body.email], (err, results, fields) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.status(201).send({msg: `User with email '${req.body.email}' deleted.`});
    });
});

module.exports = usersRouter;