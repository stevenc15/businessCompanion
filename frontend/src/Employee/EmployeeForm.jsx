import {useState, useEffect} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import './EmployeeForm.css';

//employee form for employees to log their activities
function EmployeeForm() {

  const [searchparams] = useSearchParams();
  const [clientData, setClientData] = useState(null);

  const ClientId = searchParams.get('ClientId');

  useEffect (() => {
    if (ClientId) {
      fetch(`https://businesscompanion.onrender.com/api/getSingleClient`)
        .then(res => res.json())
        .then(data => setClient(data))
        .catch(err => console.error("Error fetching the client: ", err));
    }
  }, [ClientId]);

  //define form data object
  const [formData, setFormData] = useState({EmployeeName: '', Community: '', Address: '', DoorCode: '', Service: ''});

  //function to change form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  //log submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://businesscompanion.onrender.com/api/activities', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message || 'Submitted!');
    setFormData({
      EmployeeName: '',
      Community: '',
      Address: '',
      DoorCode: '',
      Service: '',
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
          <h2 className="form-title">Employee Activity Log</h2>

          {/*logging form*/} 
          <form className="activity-form" onSubmit={handleSubmit}>
            
            {/*name*/}
            <div className="form-group">
              <label htmlFor="name">Employee Name</label>
              <input 
                id="EmployeeName"
                name="EmployeeName" 
                placeholder="Enter your full name" 
                onChange={handleChange}
                value={clientData?.EmployeeName || formData.EmployeeName}
                className="form-input"
              />
            </div>

            {/*Community*/}    
            <div className="form-group">
              <label htmlFor="task">Community</label>
              <input 
                id="Community"
                name="Community" 
                placeholder="Enter Community Name" 
                onChange={handleChange}
                value={clientData?.Community || formData.Community}
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
                value={clientData?.Address || formData.Address}
                className="form-input"
              />
            </div>

            {/*DoorCode*/}    
            <div className="form-group">
              <label htmlFor="task">Door Code</label>
              <input 
                id="DoorCode"
                name="DoorCode" 
                placeholder="Enter Door Code" 
                onChange={handleChange}
                value={clientData?.DoorCode || formData.DoorCode}
                className="form-input"
              />
            </div>

            {/*Service*/}    
            <div className="form-group">
              <label htmlFor="task">Service</label>
              <input 
                id="Service"
                name="Service" 
                placeholder="Describe Service" 
                onChange={handleChange}
                value={clientData?.Service || formData.Service}
                className="form-input"
              />
            </div>

            {/*other options at the end*/} 
            <div className="form-actions">
              {/*submit button*/} 
              <button type="submit" className="submit-button">
                Submit Activity
              </button>
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