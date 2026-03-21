/**
 * rateLimiter.js - rate limiting middleware for public and auth routes
 */

const rateLimit = require('express-rate-limit');

// Public employee form: 10 submissions per 15 minutes per IP
const employeeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many submissions, please try again later.' },
});

// Auth routes: 20 requests per 15 minutes per IP
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' },
});

module.exports = { employeeLimiter, authLimiter };
