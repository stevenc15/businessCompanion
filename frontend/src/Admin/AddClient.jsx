import {useState} from 'react';
import {Link} from 'react-router-dom';
import './css/AddClient.css';

//employee form for employees to log their activities
function AddClient() {

  //define form data object
  //CONFIG FOR FORM DATA
  
  const [formData, setFormData] = useState({ClientName: '', Address: '', Community: ''});

  //function to change form data
  //HOOK FOR FORM DATA CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  //log submission function
  //HOOK FOR FORM SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://api.hm-services.online/admin/addClient', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    const data = await res.json();
    alert(data.message || 'Submitted!');
    setFormData({
      ClientName: '',
      Address: '',
      Community: '',
    });
  };

  return (
    //Main CONTAINER
    <div className="employee-container">

      {/*header CONTAINER
      COMMON CREATE CUSTOM ELEMENT
      */}
      <div className="employee-header">
        <div className="company-logo">
          <div className="logo-placeholder">AL</div> {/*logo*/}
        </div>
        <h1 className="app-name">Activity Logger</h1> {/*title*/}
      </div>

      {/*main content CONTAINER*/}
      <div className="employee-content">
        
        {/*logging form*/}
        <div className="form-card">

          {/*heading*/}
          <h2 className="form-title">Add Client to Database</h2>

          {/*logging form*/} 
          <form className="activity-form" onSubmit={handleSubmit}>
            
            {/*name
            
          LAYOUT FORM ELEMENT
          */}
            <div className="form-group">
              <label htmlFor="name">Client Name</label>
              <input 
                id="ClientName"
                name="ClientName" 
                placeholder="Enter client name" 
                onChange={handleChange}
                value={formData.ClientName}
                className="form-input"
              />
            </div>

            {/*Address*/}    
            <div className="form-group">
              <label htmlFor="task">Address</label>
              <input 
                id="Address"
                name="Address" 
                placeholder="Enter full Address" 
                onChange={handleChange}
                value={formData.Address}
                className="form-input"
              />
            </div>

            {/*Community*/}    
            <div className="form-group">
              <label htmlFor="task">Community</label>
              <input 
                id="Community"
                name="Community" 
                placeholder="Enter Community" 
                onChange={handleChange}
                value={formData.Community}
                className="form-input"
              />
            </div>

            {/*other options at the end*/} 
            <div className="form-actions">
              {/*submit button*/} 
              <button type="submit" className="submit-button">
                Submit
              </button>
              {/*going back button
              COMMON MAKE BACK ELEMENT
              */} 
              <Link to='/clientDashboard' className="back-link">
                <button className="back-button">Return to Client Dashboard</button>
              </Link>
            </div>

          </form> 

        </div> {/*end of form*/}

      </div>
          
      {/*footer
      COMMON CREATE FOOTER ELEMENT
      */}
      <div className="employee-footer">
        <p>© 2025 Company Name. All rights reserved.</p>
        <p className="version-info">Version 1.0.2</p>
      </div>

    </div>
  );
};
    
export default AddClient;