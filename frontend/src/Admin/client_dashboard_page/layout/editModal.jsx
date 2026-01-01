/**
 * editModal.jsx - layout component for edit popup or modal when admin chooses to edit 
 * client information
 */
import '../css/ClientDashboard.css';
import editClient from '../hooks/editClient';
import changeClientForm from '../hooks/changeClientForm';

export default function EditModal( {formData, editClientID, fetchClients, setEditModal, setEditClientID, setFormData, setLoading, setClients, setAllClients} ) {
  return (
        <div className="modal-overlay">
              {/*logging form*/}
              <div className="form-card">

                {/*heading*/}
                <h2 className="form-title">Edit Client info</h2>

                {/*logging form*/} 
                <form className="activity-form" onSubmit={(e) => {
                  editClient(e, formData, editClientID, fetchClients, setEditModal, setEditClientID, setLoading, setClients, setAllClients); 
                  setFormData({ ClientName: '', Address: '', Community: '' });
                  setEditClientID(null);
                }}>
           
                  {/*name*/}
                  <div className="form-group">
                    <label htmlFor="name">Client Name</label>
                    <input 
                      id="ClientName"
                      name="ClientName" 
                      value={formData.ClientName}
                      onChange={(e) => changeClientForm(e, setFormData, formData)}
                      className="form-input"
                    />
                  </div>

                  {/*Address*/}    
                  <div className="form-group">
                    <label htmlFor="task">Address</label>
                    <input 
                      id="Address"
                      name="Address" 
                      value={formData.Address}
                      onChange={(e) => changeClientForm(e, setFormData, formData)}
                      className="form-input"
                    />
                  </div>
 
                  {/*Community*/}  
                  <div className="form-group">
                    <label htmlFor="task">Community</label>
                    <input 
                      id="Community"
                      name="Community" 
                      value={formData.Community}
                      onChange={(e) => changeClientForm(e, setFormData, formData)}
                      className="form-input"
                    />
                  </div>
                  
          
                  {/*other options at the end*/} 
                  <div className="form-actions">
                    {/*submit button*/} 
                    <button type="submit" className="submit-button">
                      Confirm Changes
                    </button>
                    {/*cancel*/} 
                    <button type="button" className="back-button" onClick={()=>{
                      setEditModal(false)
                      setFormData({ClientName: '', Address: '', Community: ''});
                      setEditClientID(null);
                      }}>Cancel</button>
                  </div>

                </form> 

              </div> {/*end of form*/}
              </div>
    );
}