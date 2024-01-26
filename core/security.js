const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SALT_ROUND = 11;

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUND);
}

async function comaprePassword(user, candidatePassword) {
    return await bcrypt.compare(candidatePassword, user.password)
}

function generateAccessToken(email) {
    return jwt.sign({ email: email }, process.env.JWT_TOKEN_SECRET, { expiresIn: 60 * 60})
}

module.exports = {
    hashPassword,
    comaprePassword,
    generateAccessToken,
}

