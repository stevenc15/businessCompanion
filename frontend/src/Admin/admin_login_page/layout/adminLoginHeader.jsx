/**
 * adminLoginHeader.jsx - layout react component meant to render 
 * the top section of the admin login container/interactive module, 
 * not the overall page itself
 */

import '../css/AdminLogin.css';

export default function AdminLoginHeader() {
    return(
        <div className="login-header">
                <div className="admin-icon">A</div> {/*logo*/}
                <h2 className="login-title">Admin Login</h2>{/*title*/}
        </div>
    );
}