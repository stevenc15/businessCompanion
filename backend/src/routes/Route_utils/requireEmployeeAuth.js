/**
 * requireEmployeeAuth.js - middleware to verify the request comes from an authenticated employee
 */

const requireEmployeeAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'employee') {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

module.exports = requireEmployeeAuth;
