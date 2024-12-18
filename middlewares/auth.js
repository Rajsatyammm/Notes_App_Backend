const jwt = require('jsonwebtoken');
const ErrorMessage = require('../constants/ErrorMessage')

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) console.log('token not found')
    if (!token)
        return res.status(401).json({
            message: ErrorMessage.ERROR_AUTH_DENIED
        });

    console.log('inside authMiddleware token present')

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({
            message: ErrorMessage.ERROR_TOKEN_NOT_VALID
        });
    }
};

module.exports = authMiddleware;
