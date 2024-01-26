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
    },
    timestamp: {
        type: Date,
        default: () => Date.now()
    }

});

commentSchema.methods.toJSON = function toJSON() {
    const commentObject = this.toObject();
    delete commentObject.__v;
    return commentObject;
}

module.exports = mongoose.model('Comment', commentSchema);