require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const { registerUser, loginUser, logoutUser } = require("./controllers/auth")
const { createPost, getMyPosts, getPostById, updatePost, deletePost, listAllPosts } = require("./controllers/posts")
const bodyParser = require("body-parser")
const { authenticateTokenMiddleware } = require("./middleware/authenticate")

// Database Connection 
mongoose.connect(process.env.MONGO_DATABASE_URL)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log("Database Connected");
})

// Express
const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get("/", function(req, res) {
    res.send("All Good");
});


app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.post("/api/logout", authenticateTokenMiddleware, logoutUser)


app.post("/api/post", authenticateTokenMiddleware, createPost)
app.get("/api/my-posts", authenticateTokenMiddleware, getMyPosts)
app.get("/api/post/:id", getPostById)
app.patch("/api/post/:id", authenticateTokenMiddleware, updatePost)
app.delete("/api/post/:id", authenticateTokenMiddleware, deletePost)
app.get("/api/all-posts", listAllPosts)

const PORT = 4000
app.listen(PORT, function() {
    console.log(`Blogging site is listening from ${PORT}`)
})