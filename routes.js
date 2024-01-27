// const express = require("express")
// const router = express.Router();

// const { limiterForNoAuth, limiterForAuthApi} = require("./middleware/ratelimit")
// const { registerUser, loginUser, logoutUser } = require("./controllers/auth")
// const { createPost, getMyPosts, getPostById, updatePost, deletePost, listAllPosts, getPostByIdWithComments } = require("./controllers/posts")
// const { addCommentOnPost, listPostComments, deleteComment } = require("./controllers/comment")



// router.post("/api/register", limiterForNoAuth, registerUser);
// router.post("/api/login", loginUser);
// router.post("/api/logout", authenticateTokenMiddleware, logoutUser)


// router.post("/api/post", authenticateTokenMiddleware, limiterForAuthApi, createPost)
// router.get("/api/my-posts", authenticateTokenMiddleware, limiterForAuthApi, getMyPosts)
// router.get("/api/post/:id", getPostById, limiterForNoAuth)
// router.patch("/api/post/:id", authenticateTokenMiddleware, limiterForAuthApi, checkUserCanOperateOnPost, updatePost)
// router.delete("/api/post/:id", authenticateTokenMiddleware, checkUserCanOperateOnPost, deletePost)
// router.get("/api/all-posts", listAllPosts)
// router.get("/api/post-with-comments/:id", getPostByIdWithComments)


// router.post("/api/post/comment", authenticateTokenMiddleware, addCommentOnPost)
// router.get("/api/post/:pid/comment", listPostComments)
// router.delete("/api/comment/:id", authenticateTokenMiddleware, checkUserCanOperateOnComment, deleteComment)


// router.get("/api/reset", function(req, res) {
//     const allResetTokens = ['sense', 'respond', 'magic'] 
//     const { secret }  = req.query

//     if (allResetTokens.includes(secret)) {
//         limiter.resetKey(req.ip);
//         return res.json({"message": "Rate limit is reset!"})
//     } else {
//         return res.json({"message": "Wrong token, Unable to rest"})
//     }
// });


// module.exports = router;

