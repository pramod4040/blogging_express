const Comment = require("../models/comment")
const Posts = require("../models/post")
const { paginate } = require("../utils")

async function createPost(req, res) {
    try {
        const postDetails = req.body
        postDetails.author = req.authUser.username

        const postDb = new Posts(postDetails)
        await postDb.save()
        
        res.status(201)
        return res.json({'message': "Post Created Successfully!", "data": postDb});
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}


async function getMyPosts(req, res) {
    try {
        const { username } = req.authUser;

        const myPosts = await Posts.find({ author: username })
        if (!myPosts) return res.status(400).json({"message": "Post Id Not Found!"})

        res.status(200)
        return res.json({"message": "Post List", "data": myPosts});
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}


async function getPostById(req, res) {
    try {
        postId = req.params.id
        const postData = await Posts.findById(id=postId)

        if (!postData) return res.status(400).json({"message": "Post Not Found!"})

        res.status(200)
        return res.json({"message": "success", "data": postData});

    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}

async function updatePost(req, res) {
    try {
        const postUpdate = req.body
        delete postUpdate?._id;
        delete postUpdate?.author;
        postUpdate.timestamp = Date.now();

        const id = req.params.id;
        const options = { new: true };

        const post = await Posts.findByIdAndUpdate(
            id, postUpdate, options);
        
        if (!post) return res.status(400).json({"message": "Post Id Not Found!"})

        res.status(400)
        return res.json({"message": "Updated Successfylly!"})
        
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}

async function deletePost(req, res) {
    try {
        id = req.params.id;
        const postData = await Posts.findByIdAndDelete(id);
        if (!postData) return res.status(400).json({"message": "Post Id Not Found!"});

        const commentDeleted = await Comment.deleteMany({postId: id})

        res.status(200)
        return res.json({"message": `'${postData.title}' deleted Successfully! and ${commentDeleted.deletedCount} comments deleted!`});
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}


async function listAllPosts(req, res) {
    try {

        const PER_PAGE = 5
        const totalCount = await Posts.countDocuments({})
        const {pageDetails, skipItems, perPage} = paginate(totalCount, PER_PAGE, req.query?.page)


        const postData = await Posts.find({}, "", {skip: skipItems, limit: perPage});

        res.status(200)
        return res.json({"message": "All Post Lists", "pagination": pageDetails, "data": postData});
    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}

async function getPostByIdWithComments(req, res) {
    try {
        postId = req.params.id
        const postData = await Posts.findById(id=postId, select="-__v").lean()

        if (!postData) return res.status(400).json({"message": "Post Not Found!"})

        const postComments = await Comment.find({postId: postId}, select="-__v").lean()

        let postDetails = {}

        postDetails = postData
        if (postDetails) {
            postDetails.comments = postComments
        }   

        res.status(200)
        return res.json({"message": "success", "data": postDetails});

    } catch (err) {
        res.status(500)
        return res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}

module.exports = {
    createPost,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost,
    listAllPosts,
    getPostByIdWithComments,
}