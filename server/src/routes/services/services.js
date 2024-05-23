const express = require("express");
const db = require('../../config/db.js');
const authMiddleware = require('../../middleware/auth_middleware');

const servicesRouter = express.Router();

servicesRouter.use(authMiddleware);

servicesRouter.get('/', (req, res) => {
    const parseDBJSON = (jsonString) => {
        const json = JSON.parse(jsonString);
        let parsedJSON = [];
        for (let idx in json)
            parsedJSON.push(json[idx]);
        return parsedJSON;
    }

    db.query('SELECT * FROM services', (err, results) => {
        if (err) {
            res.status(500).send({msg: "Internal server error"});
            throw err;
        }
        let services = [];
        for (let el of results) {
            services.push(
                {
                    "name": el.serviceName,
                    "actions": parseDBJSON(el.actions),
                    "reactions": parseDBJSON(el.reactions),
                }
            );
        }
        res.status(200).send(services);
    });
});

module.exports = servicesRouter;