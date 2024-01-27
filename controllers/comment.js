const Comment = require("../models/comment")
const { paginate } = require("../utils")

async function addCommentOnPost(req, res) {
    try {
        let commentDet = {}
        commentDet.content = req.body.content
        commentDet.postId = req.body.post_id
        commentDet.author = req.authUser.username
        commentDet.timestamp = Date.now()

        const commentDb = new Comment(commentDet);
        const commentData = await commentDb.save();

        res.status(201)
        return res.json({"message": "Comment Added!", "data": commentData})
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", 'error': err.message})
    }
}

async function listPostComments(req, res) {
    try {
        const postId = req.params.pid;
        // const {skipItems, perPage } = paginate(5, req.query?.page)

        const PER_PAGE = 5
        const totalCount = await Comment.countDocuments({})
        const {pageDetails, skipItems, perPage} = paginate(totalCount, PER_PAGE, req.query?.page)

        const postComments = await Comment.find({postId: postId}, "", {skip: skipItems, limit: perPage});

        res.status(200)
        return res.json({"message": "List Comment", "pagination":pageDetails, "data": postComments})
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}

async function deleteComment(req, res) {
    try {
        const id = req.params.id;

        const commentData = await Comment.findByIdAndDelete(id)
        if (!commentData) return res.status(400).json({"message": "Comment Id Not Found!"});

        res.status(200)
        return res.json({"message": "Comment Deleted!"})
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}

module.exports = {
    addCommentOnPost,
    listPostComments,
    deleteComment
}