/**
 * requireEmployeeAuth.js - middleware to verify the request comes from an authenticated employee
 */

// Admins also hit this route via the Client Dashboard's "Log Activity" modal,
// using a short-lived link token minted for them at submit time, so they go
// through the same validateLinkToken check as employees.
const requireEmployeeAuth = (req, res, next) => {
    if (req.isAuthenticated() && (req.user.role === 'employee' || req.user.role === 'admin')) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
};

module.exports = requireEmployeeAuth;
