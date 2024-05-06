const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


// check is user is authenticated
// exports.isAuthenticated = async (req, res, next) => {
//     const { token } = req.cookies;
//     console.log("&&&&&&&&",token);
//     // Make sure token exists
//     if (!token) {
//         return next(new ErrorResponse('You must Log In...', 401));
//     }
//     console.log("**********************************")
//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = await User.findById(decoded.id);
//         next();

//     } catch (error) {
//         return next(new ErrorResponse('You must Log In', 401));
//     }
// }

exports.isAuthenticated = async (req, res, next) => {
    // Get token from the Authorization header
    // Usually set as Authorization: Bearer TOKEN
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];  // Split 'Bearer TOKEN' and get the TOKEN part
    }
    console.log("Received Token: ", token);
    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('You must log in to access this resource', 401));
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorized to access this resource', 401));
    }
};

//middleware for admin
exports.isAdmin = (req, res, next) => {
    if (req.user.role === 'user') {
        return next(new ErrorResponse('Access denied, you must an admin', 401));
    }
    next();
}