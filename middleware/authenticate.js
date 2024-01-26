const jwt = require('jsonwebtoken')
const User = require("../models/user")
const Posts = require("../models/post")
const Comment = require("../models/comment")


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

function checkUserCanOperateOnPost(req, res, next) {
    const username = req.authUser.username
    const id = req.params.id

    const post = Posts.findById(id);
    if (post) {
        if (post.author != username) return res.status(403).json({"message": "Forbidden Access on this post!"})
    }
    next()
}

function checkUserCanOperateOnComment(req, res, next) {
    const username = req.authUser.username
    const id = req.params.id

    const post = Comment.findById(id);
    if (post) {
        if (post.author != username) return res.status(403).json({"message": "Forbidden Access on this post!"})
    }
    next()
}

module.exports = {
    authenticateTokenMiddleware,
    checkUserCanOperateOnPost,
    checkUserCanOperateOnComment,
}