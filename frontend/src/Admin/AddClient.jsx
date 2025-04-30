import {useState} from 'react';
import {Link} from 'react-router-dom';
import './AddClient.css';

//employee form for employees to log their activities
function AddClient() {

  //define form data object
  const [formData, setFormData] = useState({ClientName: '', Address: '', Email: ''});

  //function to change form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  //log submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/admin/addClient', {
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
      Email: '',
    });
  };

  return (
    //Main CONTAINER
    <div className="employee-container">

      {/*header CONTAINER*/}
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
            
            {/*name*/}
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

            {/*Email*/}    
            <div className="form-group">
              <label htmlFor="task">Email</label>
              <input 
                id="Email"
                name="Email" 
                placeholder="Enter Email" 
                onChange={handleChange}
                value={formData.Email}
                className="form-input"
              />
            </div>

            {/*other options at the end*/} 
            <div className="form-actions">
              {/*submit button*/} 
              <button type="submit" className="submit-button">
                Submit
              </button>
              {/*going back button*/} 
              <Link to='/clientDashboard' className="back-link">
                <button className="back-button">Return to Client Dashboard</button>
              </Link>
            </div>

          </form> 

        </div> {/*end of form*/}

      </div>
          
      {/*footer*/}
      <div className="employee-footer">
        <p>© 2025 Company Name. All rights reserved.</p>
        <p className="version-info">Version 1.0.2</p>
      </div>

    </div>
  );
};
    
export default AddClient;