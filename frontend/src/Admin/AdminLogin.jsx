import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './AdminLogin.css';

//Admin Login
const AdminLogin = () => {

    //email and password objects
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //navigate function
    const navigate = useNavigate();

    //function to process function
    const handleLogin = async(e) => {
        e.preventDefault();

        //if email and password are correct
        if (email=== "admin@business.com" && password=== "password"){
            localStorage.setItem('isAdmin', 'true'); //create local item to determine admin validity
            navigate('/admin'); //go to admin dashboard page
        }
        //else wrong credentials
        else{ 
            alert('Invalid Credentials');
        }
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
              
              {/*login form CONTAINER*/}
              <form className="login-form" onSubmit={handleLogin}> {/*on submit call login function*/}
                
                {/*Email Input*/}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    className="form-input"
                    required
                  />
                </div>
                
                {/*Password Input*/}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    id="password"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    className="form-input"
                    required
                  />
                </div>
                
                {/*Other options CONTAINER*/}
                <div className="form-actions">
                  
                  {/*submit button*/}
                  <button type="submit" className="login-button">
                    Sign In
                  </button>

                  {/*Go back button*/}
                  <Link to='/' className="back-link">
                    <button className="back-button">Return to Home</button>
                  </Link>

                </div>

              </form>
              
              {/*Login Help Options CONTAINER*/}
              <div className="login-help">
                <a href="#" className="help-link">Forgot password?</a>
                <span className="help-divider">|</span>
                <a href="#" className="help-link">Contact IT Support</a>
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