/**
 * EmployeeLogin.jsx - Google sign-in page for employees.
 *
 * Preserves the original form URL (including token) through the OAuth flow
 * so the employee lands back on their form after signing in.
 */

import { useSearchParams } from 'react-router-dom';
import { API_URL } from '../../config/api';
import '../../Admin/admin_login_page/css/AdminLogin.css';

export default function EmployeeLogin() {
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/employee';
    const error = searchParams.get('error');

    const loginUrl = `${API_URL}/auth/employee/login/google?redirect=${encodeURIComponent(redirect)}`;

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-container">
                        <div className="logo-placeholder">HM</div>
                    </div>
                    <h1 className="login-title">Employee Sign In</h1>
                    <p className="login-subtitle">Sign in with your Google account to access the activity form</p>
                </div>

                {error === 'unauthorized' && (
                    <div style={{ color: '#e53e3e', background: '#fff5f5', border: '1px solid #fc8181', borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Your Google account is not authorized. Please contact your admin.
                    </div>
                )}

                <div className="login-actions">
                    <a href={loginUrl} className="google-signin-button">
                        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '10px' }}>
                            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                        </svg>
                        Sign in with Google
                    </a>
                </div>
            </div>
        </div>
    );
}
