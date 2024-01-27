const User = require("../models/user")
const { hashPassword, comaprePassword, generateAccessToken } = require("../core/security")

// Register Function
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body
        const user = await User.findOne({ email })
 
        if (user) {
            let statusCode = 400
            let message = "Email Already Exists!"
    
            if (user.username === username) {
                statusCode = 400
                message = "Username Already Exists!"
            }
            res.status(statusCode)
            return res.json({"message": `${message}`})
        } else {
            const hpass = await hashPassword(password)
            const newUser = new User({username: username, email: email, password: hpass});
            await newUser.save();
            
            res.status(201)
            return res.json({"message": "User Created Successfully!"});
        }
    } catch (err) {
        console.log(err)
        res.status(500)
        return res.json({"message": "Some thing unexpected!", "error": err.message})
    }
}


// Login Function
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({"message": "Invalid Email or Password"})

        const validPassword = await comaprePassword(user, password)

        if (validPassword) {
            const token = generateAccessToken(user.email)
            res.status(200)
            return res.json({"user": user, "token": token})

        } else {
            res.status(400)
            return res.json({"message": "Invalid Email or Password!"})
        }

    } catch (err) {
        console.log(err)
        res.status(500)
        res.json({"message": "Something Unexpected Happened!", "error": err.message})
    }
}


// Logout Function
async function logoutUser(req, res) {
    // Remove Access Token From LocalStorage In FrontEnd
    res.json({"message": "User Logout Successfully!"});
}

module.exports = { 
    registerUser,
    loginUser,
    logoutUser
}