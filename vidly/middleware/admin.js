

function admin (req, res, next) {
    // 401 Unauthorized
    // 403 Forbidden

    // can also look at roles or operations

    if (!req.user.isAdmin) {
        return res.status(403).send('Access denied.');
    }
    next();
}

module.exports = admin;