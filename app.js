require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const { registerUser, loginUser, logoutUser } = require("./controllers/auth")
const { createPost, getMyPosts, getPostById, updatePost, deletePost, listAllPosts, getPostByIdWithComments } = require("./controllers/posts")
const { addCommentOnPost, listPostComments, deleteComment } = require("./controllers/comment")
const bodyParser = require("body-parser")
const { authenticateTokenMiddleware, checkUserCanOperateOnPost, checkUserCanOperateOnComment } = require("./middleware/authenticate")
const { limiterForNoAuth, limiterForAuthApi} = require("./middleware/ratelimit")

// Database Connection 
mongoose.connect(process.env.MONGO_DATABASE_URL)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
});

// database.once('connected', () => {
//     console.log("Database Connected");
// })

// Express
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", function(req, res) {
    res.send("All Good");
});


app.post("/api/register", limiterForNoAuth, registerUser);
app.post("/api/login", loginUser);
app.post("/api/logout", authenticateTokenMiddleware, logoutUser)


app.post("/api/post", authenticateTokenMiddleware, limiterForAuthApi, createPost)
app.get("/api/my-posts", authenticateTokenMiddleware, limiterForAuthApi, getMyPosts)
app.get("/api/post/:id", getPostById, limiterForNoAuth)
app.patch("/api/post/:id", authenticateTokenMiddleware, limiterForAuthApi, checkUserCanOperateOnPost, updatePost)
app.delete("/api/post/:id", authenticateTokenMiddleware, checkUserCanOperateOnPost, deletePost)
app.get("/api/all-posts", listAllPosts)
app.get("/api/post-with-comments/:id", getPostByIdWithComments)


app.post("/api/post/comment", authenticateTokenMiddleware, addCommentOnPost)
app.get("/api/post/:pid/comment", listPostComments)
app.delete("/api/comment/:id", authenticateTokenMiddleware, checkUserCanOperateOnComment, deleteComment)


app.get("/api/reset", function(req, res) {
    const allResetTokens = ['sense', 'respond', 'magic'] 
    const { secret }  = req.query

    if (allResetTokens.includes(secret)) {
        limiter.resetKey(req.ip);
        return res.json({"message": "Rate limit is reset!"})
    } else {
        return res.json({"message": "Wrong token, Unable to rest"})
    }
});


const PORT = 4000
app.listen(PORT, function() {
    console.log(`Blogging site is listening from ${PORT}`)
})