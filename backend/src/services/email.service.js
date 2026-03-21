/**
 * email.service.js - sends emails via Resend
 */

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const { FRONTENDAPPURL } = require('../config/appConfig');

async function sendEmployeeLinks(toEmail, clientLinks) {
    const linkItems = clientLinks
        .map(({ clientName, address, url }) =>
            `<li style="margin-bottom:12px;">
                <strong>${clientName}</strong><br/>
                ${address}<br/>
                <a href="${url}" style="color:#3182ce;">Open Form</a>
            </li>`
        )
        .join('');

    await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: toEmail,
        subject: 'Your Activity Form Links',
        html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
                <h2 style="color:#0a2f5c;">Activity Form Links</h2>
                <p>Here are your form links for today. Each link expires in 24 hours.</p>
                <ul style="padding-left:20px;">
                    ${linkItems}
                </ul>
                <p style="color:#718096;font-size:0.85rem;margin-top:24px;">
                    You will need to sign in with your Google account to submit a form.
                </p>
            </div>
        `,
    });
}

module.exports = { sendEmployeeLinks };
