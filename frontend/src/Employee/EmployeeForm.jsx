import {useState} from 'react';
import {Link} from 'react-router-dom';
import './EmployeeForm.css';

//employee form for employees to log their activities
function EmployeeForm() {

  //define form data object
  const [formData, setFormData] = useState({name: '', task: ''});

  //function to change form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  //log submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/activities', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message || 'Submitted!');
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
          <h2 className="form-title">Employee Activity Log</h2>

          {/*logging form*/} 
          <form className="activity-form" onSubmit={handleSubmit}>
            
            {/*name*/}
            <div className="form-group">
              <label htmlFor="name">Employee Name</label>
              <input 
                id="name"
                name="name" 
                placeholder="Enter your full name" 
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/*task*/}    
            <div className="form-group">
              <label htmlFor="task">Task Description</label>
              <input 
                id="task"
                name="task" 
                placeholder="Describe your task or activity" 
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {/*other options at the end*/} 
            <div className="form-actions">
              {/*submit button*/} 
              <button type="submit" className="submit-button">
                Submit Activity
              </button>
              {/*going back button*/} 
              <Link to='/' className="back-link">
                <button className="back-button">Return to Home</button>
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
    
export default EmployeeForm;