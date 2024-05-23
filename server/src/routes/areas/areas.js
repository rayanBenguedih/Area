const express = require("express");
const db = require('../../config/db.js');
const { v4: uuidv4 } = require('uuid');
const authMiddleware = require('../../middleware/auth_middleware');

const areasRouter = express.Router();

areasRouter.use(authMiddleware);

areasRouter.get('/', (req, res) => {
    db.query('SELECT * FROM areas WHERE userId=?', [req.session.passport.user.id], (err, results) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.status(200).send(results);
    });
});

areasRouter.post('/', (req, res) => {
    const areaUUID = uuidv4();
    db.query('INSERT INTO areas (id, userId, areaName, actionService, actionLabel, reactionService, reactionLabel) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [areaUUID, req.session.passport.user.id, req.body.areaName, req.body.actionService, req.body.actionLabel, req.body.reactionService, req.body.reactionLabel],
    (err) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.sendStatus(200);
    });
});

areasRouter.delete('/:id', (req, res) => {
    db.query(`DELETE FROM areas WHERE id=?`, [req.params.id], (err) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        res.sendStatus(201);
    });
});

module.exports = areasRouter;