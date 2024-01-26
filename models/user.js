const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        trim: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
        trim: true
    },
    password: {
        required: true,
        type: String,
        min: 4,
        trim: true
    }
})

userSchema.methods.toJSON = function toJSON() {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.__v;
    return userObject;
}

module.exports = mongoose.model('User', userSchema);