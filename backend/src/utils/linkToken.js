/**
 * linkToken.js - generates and verifies signed 24-hour JWT tokens for employee form links
 */

const jwt = require('jsonwebtoken');

function generateLinkToken(clientId) {
    return jwt.sign(
        { clientId },
        process.env.LINK_SECRET,
        { expiresIn: '24h' }
    );
}

function verifyLinkToken(token) {
    return jwt.verify(token, process.env.LINK_SECRET);
}

module.exports = { generateLinkToken, verifyLinkToken };
