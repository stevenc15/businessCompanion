/**
 * adminLoginPageHeader.jsx - header layout component for admin page containing 
 * app logo and name
 */
import '../css/AdminLogin.css';

export default function AdminLoginPageHeader() {
    return (
        <div className="admin-header">
            <div className="company-logo"> 
              <div className="logo-placeholder">AL</div> {/*logo*/}
            </div>
            <h1 className="app-name">Activity Logger</h1> {/*title*/}
        </div>
    );
}