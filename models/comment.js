const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
    // timestamp: {
    //     type: timestamp,

    // }

});

module.exports = mongoose.model('Comment', commentSchema);