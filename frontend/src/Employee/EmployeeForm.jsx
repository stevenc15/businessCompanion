/**
 * Employee submission form component
 * 
 * This component allows employees to log their activities and submit them to the system.
 * It includes fields for employee name, community, client name, address, and service description 
 * in the form of a checklist.
 * When submitted, this data will show up in a new row on the central Google Sheets file
 */

import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import './css/EmployeeForm.css';

// hooks
import useGetClientData from './hooks/getClientData';
import usePrefillForm from './hooks/preFillForm';
import submitForm from './hooks/submitForm';
import changeForm from './hooks/changeForm';

// layout components
import Checklist from './layout/checklist';
import EmployeeHeader from './layout/employeeHeader';
import EmployeeFooter from './layout/employeeFooter';
import Form from './layout/form';

//config
import { CHECKLISTITEMS } from './config/checklistConfig';  
import { FORMDEFAULT } from './config/formDefault';


//employee form for employees to log their activities
export default function EmployeeForm() {

    const [searchParams] = useSearchParams();
    const ClientId = searchParams.get('ClientId');
    console.log("ClientId:", ClientId);

    //containers for client data and form data
    const [clientData, setClientData] = useState(null);
    const [formData, setFormData] = useState(FORMDEFAULT);

    //fetch client data base on ClientId
    setClientData(useGetClientData(ClientId));

    //populate form data with client data
    usePrefillForm(clientData, setFormData);    

    const checklistItems = CHECKLISTITEMS;
    console.log("Checklist Items:", checklistItems);

    useEffect(() => {
    console.log("Client data updated:", clientData);
    }, [clientData]);

    useEffect(() => {
    console.log("Form data after prefill:", formData);
    }, [formData]);

    return(
        //Main CONTAINER
        <div className="employee-container">
            <EmployeeHeader />

            {/*main content CONTAINER*/}
            <div className="employee-content">
        
                {/*logging form*/}
                <div className="form-card">

                    {/*heading*/}
                    <h2 className="form-title">Employee Activity Log</h2>

                    {/*logging form*/} 
                    <form className="activity-form" onSubmit={(e) => submitForm(e, formData, setFormData)}>
            
                        <Form 
                            formData={formData} 
                            setFormData={setFormData} 
                            changeForm={changeForm} 
                            clientData={clientData} 
                        />

                        {/*checklist component*/}
                        <Checklist
                            checklistItems={checklistItems} 
                            formData={formData} 
                            handleChange={(e) => changeForm(setFormData, e)} 
                        />

                        {/*submit button*/}
                        <div className="form-actions">
                            <button type="submit" className="submit-button">
                                Submit Activity
                            </button>
                        </div>
                    </form> 
                </div>
            </div>

            <EmployeeFooter />
        </div>
    );
};

