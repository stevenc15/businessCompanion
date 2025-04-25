import {Link} from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (

      //Top CONTAINER
      <div className="landing-container">

        {/*Header CONTAINER*/}
        <div className="landing-header">
          <div className="company-logo">
            <div className="logo-placeholder">AL</div> {/*Logo*/}
          </div>
          <h1 className="app-name">Activity Logger</h1> {/*Title*/}
        </div>
        
        {/*main content CONTAINER*/}
        <div className="landing-content">

          <h2 className="welcome-text">Welcome to the system</h2> {/*Title*/}
          <p className="instruction-text">Please select your role to continue:</p> {/*Title*/}
          
          {/*ROLES*/}
          <div className="role-selection">

            {/*employee*/}
            <Link to="/employee" className="role-link">
              
              <div className="role-card employee-card">
                <div className="role-icon employee-icon">E</div> {/*icon*/}
                <h3 className="role-title">Employee</h3> {/*title*/}
                <p className="role-description">Log and track your activities</p> {/*short description*/}
              </div>

            </Link>
            
            {/*admin*/}
            <Link to="/adminlogin" className="role-link">
              
              <div className="role-card admin-card">
                <div className="role-icon admin-icon">A</div> {/*icon*/}
                <h3 className="role-title">Administrator</h3> {/*title*/}
                <p className="role-description">Manage system and users</p> {/*short description*/}
              </div>

            </Link>

          </div>

        </div>
        
        {/*Footer CONTAINER*/}
        <div className="landing-footer">
          <p>© 2025 Company Name. All rights reserved.</p>
          <p className="version-info">Version 1.0.2</p>
        </div>

      </div>
    );
  }
  
  export default LandingPage;