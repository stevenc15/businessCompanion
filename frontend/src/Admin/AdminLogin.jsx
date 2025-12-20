import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './css/AdminLogin.css';

//Admin Login
const AdminLogin = () => {
    //email and password objects    

    //function to call login endpoint
    const handleGoogleLogin = async(event)=> {
      window.location.href='https://api.hm-services.online/auth/google';
  };

    return (
        //MAIN CONTAINER
        <div className="admin-container">

          {/*Header CONTAINER*/}
          <div className="admin-header">
            <div className="company-logo"> 
              <div className="logo-placeholder">AL</div> {/*logo*/}
            </div>
            <h1 className="app-name">Activity Logger</h1> {/*title*/}
          </div>

          {/*Main CONTAINER*/}
          <div className="admin-content">
            
            {/*Login CONTAINER*/}
            <div className="login-card">

              <div className="login-header">
                <div className="admin-icon">A</div> {/*logo*/}
                <h2 className="login-title">Admin Login</h2>{/*title*/}
              </div>
              
              <div className="google-signin-container">
                <button 
                  className="google-signin-button"
                  onClick={handleGoogleLogin}
                >
                  <svg className="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path className="blue" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                    <path className="green" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                    <path className="yellow" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                    <path className="red" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                  </svg>
                  Sign in with Google
                </button>
              </div>
              
              {/*Login Help Options CONTAINER*/}
              <div className="login-help">                
                <a href="mailto:stevenacamachoperez@gmail.com" className="contact-button">
                  Contact IT Support
                </a>
              </div>

            </div>

          </div>
          
          {/*footer CONTAINER*/}
          <div className="admin-footer">
            <p>© 2025 Company Name. All rights reserved.</p>
            <p className="version-info">Version 1.0.2</p>
          </div>

        </div>
      );
    };

export default AdminLogin; 