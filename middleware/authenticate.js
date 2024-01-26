const jwt = require('jsonwebtoken')
const User = require("../models/user")

function authenticateTokenMiddleware(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).json({"message": "Unauthenticated!"})

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).json({"message": "Invalid Token"})
        req.authUser = await User.findOne({email: user.email})

        next()
    });
}

module.exports = {
    authenticateTokenMiddleware,
}