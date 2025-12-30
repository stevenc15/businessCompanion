/**
 * helpButton.jsx - layout component for contact help button on admin login page
 */

import '../css/AdminLogin.css';

export default function HelpButton() {
    return (
        <div className="login-help">                
            <a href="mailto:stevenacamachoperez@gmail.com" className="contact-button">
                Contact IT Support
            </a>
        </div>
    );
}