/**
 * AddClient.jsx - main file that renders each component pertaining to the add client page
 * for the admin
 * 
 * Gives the admin a form with spots available to fill with client info and submit 
 * to the client dashboard
 */

import {useState} from 'react';
import './css/AddClient.css';
import { CLIENTFORMCONFIG } from './config/clientForm';
import changeClientForm from './hooks/changeClientForm';
import submitClientForm from './hooks/submitClientForm';
import AddClientHeader from './layout/addClientHeader';
import AddClientForm from './layout/addClientForm';
import SubmitButton from './layout/submitButton';
import ReturnToClientDashboard from './layout/returnToClientDashboard';
import AdminFooter from './layout/footer';

//employee form for employees to log their activities
function AddClient() {
  
  const [formData, setFormData] = useState(CLIENTFORMCONFIG);

  return (

    <div className="employee-container">

      <AddClientHeader />

      <div className="employee-content">
        
        <div className="form-card">

          <h2 className="form-title">Add Client to Database</h2>

          <form 
            className="activity-form" 
            onSubmit={(e) => submitClientForm(e, formData, setFormData)}
          >
            
            <AddClientForm 
              formData={formData} 
              handleChange={(e) => changeClientForm(e, setFormData, formData)} 
            />                     

            <div className="form-actions">

              <SubmitButton />
              
              <ReturnToClientDashboard />
            
            </div>

          </form> 

        </div> 

      </div>
          
    <AdminFooter />

    </div>
  );
};
    
export default AddClient;