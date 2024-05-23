function authMiddleware(req, res, next) {
    if (req.isAuthenticated() == true)
        return next();
    res.sendStatus(401);
}

module.exports = authMiddleware;