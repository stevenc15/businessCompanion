/**
 * AdminLogin.jsx - main file that renders each component necessary for the admin login
 * page
 */

import './css/AdminLogin.css';
import AdminLoginPageHeader from './layout/adminLoginPageHeader';
import AdminLoginHeader from './layout/adminLoginHeader';
import GoogleSignin from './layout/googleSigninContainer';
import HelpButton from './layout/helpButton';
import AdminLoginFooter from './layout/adminLoginFooter';

const AdminLogin = () => {  

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