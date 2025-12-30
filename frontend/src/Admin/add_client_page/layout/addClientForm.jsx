/**
 * addClientForm.jsx - layout component for add client form
 */

import '../css/AddClient.css';

export default function AddClientForm({ formData, handleChange }) {

    return (
        <div>
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
        </div>
    )
}