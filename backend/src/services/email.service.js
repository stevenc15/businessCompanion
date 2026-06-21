/**
 * email.service.js - sends emails via Resend
 */

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const { FRONTENDAPPURL } = require('../config/appConfig');
const Admin = require('../models/Admin');

async function sendEmployeeLinks(toEmail, clientLinks, ccEmail) {
    const sentAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    });

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
        cc: ccEmail ? [ccEmail] : [],
        subject: 'Your Activity Form Links',
        html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
                <div style="background:#0a2f5c;color:white;padding:12px 20px;border-radius:6px;margin-bottom:20px;">
                    <span style="font-size:0.85rem;opacity:0.9;">Sent on</span><br/>
                    <strong style="font-size:1rem;">${sentAt}</strong>
                </div>
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

async function notifyAdminsOfSubmissionFailure({
    employeeName,
    clientName,
    address,
    community,
    service,
    dbSuccess,
    dbErrorMessage,
    sheetSuccess,
    sheetErrorMessage,
}) {
    const admins = await Admin.findAll();
    const adminEmails = admins.map(admin => admin.email);

    if (adminEmails.length === 0) return;

    const failedAt = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    });

    await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: adminEmails,
        subject: 'Activity Submission Failure',
        html: `
            <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
                <div style="background:#9b2c2c;color:white;padding:12px 20px;border-radius:6px;margin-bottom:20px;">
                    <span style="font-size:0.85rem;opacity:0.9;">Failed on</span><br/>
                    <strong style="font-size:1rem;">${failedAt}</strong>
                </div>
                <h2 style="color:#9b2c2c;">Activity Submission Failure</h2>
                <p><strong>Employee:</strong> ${employeeName}</p>
                <p><strong>Client:</strong> ${clientName} — ${address} (${community})</p>
                <p><strong>Service:</strong> ${service}</p>
                <ul style="padding-left:20px;">
                    <li>Database: ${dbSuccess ? '✅ saved' : `❌ failed — ${dbErrorMessage || 'unknown error'}`}</li>
                    <li>Spreadsheet: ${sheetSuccess ? '✅ synced' : `❌ failed — ${sheetErrorMessage || 'unknown error'}`}</li>
                </ul>
                ${!dbSuccess ? '<p style="color:#9b2c2c;"><strong>The employee was asked to resubmit this activity.</strong></p>' : ''}
            </div>
        `,
    });
}

module.exports = { sendEmployeeLinks, notifyAdminsOfSubmissionFailure };
