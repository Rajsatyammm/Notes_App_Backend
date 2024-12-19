const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorMessage = require('../constants/ErrorMessage')

const validatePassword = (password) => {
    // use regex for password matching
    return password.length >= 8;
}

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('registerUser')
    try {
        if (!validatePassword(password))
            return res.status(400).json({
                message: ErrorMessage.ERROR_SHORT_PASSWORD
            });
        const userExists = await User.findOne({ email });
        if (userExists)
            return res.status(400).json({
                message: ErrorMessage.ERROR_USER_ALREADY_EXISTS
            });

        const user = new User({
            username, email, password
        });
        await user.save();
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });
        return res.status(200).json({
            token
        });
    } catch (error) {
        res.status(500).json({
            message: ErrorMessage.SERVER_ERROR
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({
                message: ErrorMessage.ERROR_INVALID_CREDENTIALS
            });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: ErrorMessage.ERROR_INVALID_CREDENTIALS
            });
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '3h'
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({
            message: ErrorMessage.SERVER_ERROR
        });
    }
};

const verifyToken = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({
            message: ErrorMessage.ERROR_AUTH_DENIED
        });
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;
        next();
    } catch (err) {
        res.status(401).json({
            message: ErrorMessage.ERROR_TOKEN_NOT_VALID
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.id).select('-password');
        if (!user) {
            return res.status(404).json({
                message: ErrorMessage.ERROR_USER_NOT_FOUND
            });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: ErrorMessage.SERVER_ERROR
        });
    }
};

const updateProfile = async (req, res) => {
    console.log('update profile called')
    try {
        const user = await User.findById(req.id).select('-password');
        const { name, password, email } = req.body;

        await User.findOneAndUpdate(
            { _id: req.id },
            {
                name: name ? name : user.name,
                email: email ? email : user.email,
                password: password ? password : user.password
            },
            { new: true }
        )
        res.status(200);
    } catch (err) {
        res.status(500).json({
            message: ErrorMessage.SERVER_ERROR
        });
    }
}

module.exports = { registerUser, loginUser, verifyToken, getUserProfile, updateProfile };
