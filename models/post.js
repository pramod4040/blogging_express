const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: () => Date.now()
    }
})

postSchema.methods.toJSON = function toJSON() {
    const postObject = this.toObject();
    delete postObject.__v;
    return postObject;
}


module.exports = mongoose.model('Post', postSchema);