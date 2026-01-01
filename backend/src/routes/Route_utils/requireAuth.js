/**
 * requireAuth.js - middleware file used to verify usage of endpoints by a valid user
 */

const requireAuth = (req, res, next) => {
    
    if (req.isAuthenticated()){
        return next();
    }

    res.status(401).json({ message: 'Unauthorized'});
};

module.exports = requireAuth;