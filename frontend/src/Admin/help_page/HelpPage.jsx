/**
 * HelpPage.jsx - Admin reference page explaining how the application works.
 * Covers features, timings, employee requirements, and common troubleshooting.
 */

import { useNavigate } from 'react-router-dom';
import '../client_dashboard_page/css/ClientDashboard.css';
import './css/HelpPage.css';

const SECTIONS = [
    {
        id: 'admin-login',
        title: 'Admin Login',
        content: [
            'Sign in using the Google account that has been authorized by the system. If your account is not recognized, contact whoever manages the database to have your email added.',
            'Your session stays active for 24 hours. You will not need to sign in again within the same day.',
            'Always use a standard browser window — private or incognito windows do not retain sessions and will require you to sign in every time.',
        ],
    },
    {
        id: 'client-management',
        title: 'Client Management',
        content: [
            'The Client Dashboard is your central hub. From here you can add, edit, delete, and search all client records.',
            'Every client requires three fields: Client Name, Address, and Community. All three are mandatory.',
            'You can delete multiple clients at once by selecting them using their checkboxes, then choosing the bulk delete option that appears in the toolbar.',
            'Editing a client updates the record in the database immediately. Any future form links or QR codes generated after an edit will use the updated information.',
        ],
    },
    {
        id: 'qr-codes',
        title: 'QR Codes',
        content: [
            'QR codes are generated per client from the Client Dashboard. Each QR code encodes a secure, signed link that opens the employee activity form pre-filled with that client\'s information.',
            'QR codes are valid for 7 days from the moment they are generated. After 7 days the code is expired and a new one must be generated.',
            'Once generated, you can download and print the QR code to post at the client\'s property. Employees scan the code with their phone camera to open the form.',
            'If a QR code expires while posted at a property, generate a new one from the Client Dashboard and replace it.',
        ],
    },
    {
        id: 'email-links',
        title: 'Sending Form Links by Email',
        content: [
            'From the Client Dashboard, select one or more clients using their checkboxes. A toolbar will appear with a "Send Links" option.',
            'You will be prompted to enter the employee\'s email address. One email is sent containing a separate form link for each selected client.',
            'Email links are valid for 24 hours from the moment they are sent. After 24 hours the link expires and the employee will see an error if they try to use it.',
            'If an employee misses the window, simply send a new set of links from the Client Dashboard.',
            'Each link is unique to a specific client — the form is pre-filled with that client\'s name, address, and community when the employee opens it.',
        ],
    },
    {
        id: 'employee-whitelist',
        title: 'Employee Whitelist',
        content: [
            'Only Google accounts whose email address appears in the employee whitelist are permitted to sign in and submit forms.',
            'Manage the whitelist from the Employee Management page, accessible via the button in the Client Dashboard header.',
            'To add an employee, enter their Google account email address. A name is optional but recommended for your own reference.',
            'If an employee tries to sign in with a Google account that is not on the whitelist, they will see an "unauthorized" message and cannot proceed.',
            'Removing an employee from the whitelist takes effect immediately for any new sign-in attempts. If the employee already has an active session, it will remain valid until it expires naturally (within 24 hours).',
            'If you add a duplicate email, the system will return an error — each email can only appear once.',
        ],
    },
    {
        id: 'activity-dashboard',
        title: 'Activity Dashboard',
        content: [
            'The Activity Dashboard displays a live view of the Google Sheet where all employee form submissions are recorded.',
            'Every time an employee successfully submits an activity form, a new row is added to the sheet in real time.',
            'You can export the full sheet as an Excel (.xlsx) file using the export button on the dashboard.',
        ],
    },
    {
        id: 'employee-guide',
        title: 'Employee Requirements & Guidelines',
        subtitle: 'Share this information with your employees so they know what to expect.',
        content: [
            'Employees must use the Google account email that you have added to the whitelist. Any other Google account will be rejected.',
            'Employees must use a standard, non-incognito browser. Private or incognito windows do not retain sessions, so the employee would need to sign in again for every single form.',
            'Once signed in, the employee session lasts 24 hours. They can open and submit multiple form links throughout the day without signing in again — as long as they use the same browser.',
            'If an employee switches to a different browser or device mid-day, they will need to sign in again on that browser.',
            'Email links expire after 24 hours. QR codes expire after 7 days. If an employee tries to open an expired link, they will see an "Invalid Link" error.',
            'The form automatically fills in the client name, address, and community. The employee only needs to enter their own name, the service type, and complete the inspection checklist.',
            'After submitting a form, the employee\'s name and service type fields clear. They will need to re-enter those for each subsequent client.',
            'There is a limit on how many forms can be submitted within a short window of time per device. Under normal use this limit will never be reached, but if an employee encounters a "Too many submissions" error, they should wait 15 minutes before trying again. The wait starts from when they submitted their first form in that window, not from when they were blocked.',
        ],
    },
    {
        id: 'troubleshooting',
        title: 'Troubleshooting Common Issues',
        content: [
            '"Your account is not authorized" — The employee\'s Google account email is not in the whitelist. Add it from the Employee Management page.',
            '"Invalid Link" or "Missing token" — The link is malformed or was not generated by the system. Resend the links or generate a new QR code.',
            '"Link has expired" — The 24-hour window for email links (or 7-day window for QR codes) has passed. Generate and send new links.',
            '"Too many submissions" — The employee has hit the submission limit for their current time window. They should wait 15 minutes from their first submission in that window and try again.',
            'Employee is asked to sign in every time — They are likely using incognito/private browsing mode. They must switch to a standard browser window.',
            'Employee signed in on one device but cannot access the form on another — Sessions are browser-specific. They need to sign in separately on each device or browser they use.',
            'Admin cannot sign in — The Google account email is not in the admins table. This is managed directly in the database and must be updated by whoever administers the system.',
        ],
    },
];

const QUICK_REFERENCE = [
    { label: 'Admin session duration', value: '24 hours' },
    { label: 'Employee session duration', value: '24 hours' },
    { label: 'Email link validity', value: '24 hours from when sent' },
    { label: 'QR code validity', value: '7 days from when generated' },
    { label: 'Form submission wait (if blocked)', value: 'Up to 15 minutes' },
    { label: 'Required client fields', value: 'Client Name, Address, Community' },
    { label: 'Required form fields (employee)', value: 'Employee Name, Service Type' },
    { label: 'Inspection checklist items', value: '17 tasks' },
];

export default function HelpPage() {
    const navigate = useNavigate();

    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <div className="company-logo">
                    <div className="logo-placeholder">HM</div>
                    <span className="app-name">Admin Reference Guide</span>
                </div>
                <div className="header-actions">
                    <button className="go-back-button" onClick={() => navigate('/clientDashboard')}>
                        Back to Clients
                    </button>
                </div>
            </div>

            <div className="dashboard-content">

                <div className="help-intro">
                    <h2 className="dashboard-title">How the Application Works</h2>
                    <p className="help-intro-text">
                        This page covers everything you need to know about managing clients, employees, and activity forms.
                        It also includes a section you can share with employees to help them understand what is expected of them.
                    </p>
                </div>

                <div className="help-quick-reference data-table-container">
                    <div className="table-header">
                        <h3 className="table-title">Quick Reference</h3>
                    </div>
                    <table className="data-table">
                        <tbody>
                            {QUICK_REFERENCE.map((row, i) => (
                                <tr key={i}>
                                    <td className="help-ref-label">{row.label}</td>
                                    <td className="help-ref-value">{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="help-sections">
                    {SECTIONS.map(section => (
                        <div key={section.id} className="help-section data-table-container">
                            <div className="table-header">
                                <div>
                                    <h3 className="table-title">{section.title}</h3>
                                    {section.subtitle && (
                                        <p className="help-section-subtitle">{section.subtitle}</p>
                                    )}
                                </div>
                            </div>
                            <ul className="help-list">
                                {section.content.map((item, i) => (
                                    <li key={i} className="help-list-item">{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
