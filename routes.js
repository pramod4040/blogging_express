const express = require("express")
const router = express.Router();

const { authenticateTokenMiddleware, checkUserCanOperateOnPost, checkUserCanOperateOnComment } = require("./middleware/authenticate")
const { limiterForNoAuth, limiterForAuthApi} = require("./middleware/ratelimit")
const { registerUser, loginUser, logoutUser } = require("./controllers/auth")
const { createPost, getMyPosts, getPostById, updatePost, deletePost, listAllPosts, getPostByIdWithComments } = require("./controllers/posts")
const { addCommentOnPost, listPostComments, deleteComment } = require("./controllers/comment")



router.post("/register", limiterForNoAuth, registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateTokenMiddleware, logoutUser)


router.post("/post", authenticateTokenMiddleware, limiterForAuthApi, createPost)
router.get("/my-posts", authenticateTokenMiddleware, limiterForAuthApi, getMyPosts)
router.get("/post/:id", getPostById, limiterForNoAuth)
router.patch("/post/:id", authenticateTokenMiddleware, limiterForAuthApi, checkUserCanOperateOnPost, updatePost)
router.delete("/post/:id", authenticateTokenMiddleware, limiterForAuthApi, checkUserCanOperateOnPost, deletePost)
router.get("/all-posts", listAllPosts, limiterForNoAuth)
router.get("/post-with-comments/:id", getPostByIdWithComments, limiterForNoAuth)


router.post("/post/comment", authenticateTokenMiddleware, limiterForAuthApi, addCommentOnPost)
router.get("/post/:pid/comment", listPostComments, limiterForNoAuth)
router.delete("/comment/:id", authenticateTokenMiddleware, limiterForNoAuth, checkUserCanOperateOnComment, deleteComment)


router.get("/reset", function(req, res) {
    const allResetTokens = ['sense', 'respond', 'magic'] 
    const { secret }  = req.query

    if (allResetTokens.includes(secret)) {
        limiter.resetKey(req.ip);
        return res.json({"message": "Rate limit is reset!"})
    } else {
        return res.json({"message": "Wrong token, Unable to rest"})
    }
});


module.exports = router;

