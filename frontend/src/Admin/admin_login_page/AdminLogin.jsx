/**
 * AdminLogin.jsx - main file that renders each component necessary for the admin login
 * page
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdminLogin.css';
import AdminLoginPageHeader from './layout/adminLoginPageHeader';
import AdminLoginHeader from './layout/adminLoginHeader';
import GoogleSignin from './layout/googleSigninContainer';
import HelpButton from './layout/helpButton';
import AdminLoginFooter from './layout/adminLoginFooter';
import { API_URL } from '../../config/api';

const AdminLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_URL}/auth/status`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => { if (data.authenticated) navigate('/activityDashboard'); })
            .catch(() => {});
    }, [navigate]);

    return (
        //MAIN CONTAINER
        <div className="admin-container">

          <AdminLoginPageHeader />

          <div className="admin-content">
            
            <div className="login-card">

              <AdminLoginHeader />
              
              <GoogleSignin />

              <HelpButton />

            </div>

          </div>
          
          <AdminLoginFooter />

        </div>
      );
    };

export default AdminLogin; 