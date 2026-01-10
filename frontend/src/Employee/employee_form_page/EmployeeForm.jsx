/**
 * Main Employee submission form component
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
import useGetClientData from './hooks/useGetClientData';
import submitForm from './services/submitForm';
import changeForm from './services/changeForm';

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

    //containers for form data
    const [formData, setFormData] = useState(FORMDEFAULT);
    
    const [isPrefilled, setIsPrefilled] = useState(false);

    //fetch client data base on ClientId
    const clientData = useGetClientData(ClientId);

    //populate form data with client data
    //usePrefillForm(clientData, setFormData, formData);    

    const checklistItems = CHECKLISTITEMS;

    useEffect(() => {
        if (!clientData || isPrefilled) return;
        console.log("pre fill use effect called");
        setFormData(prev => ({
            ...prev,
            ClientName: clientData.ClientName,
            Address: clientData.Address,
            Community: clientData.Community,
        }));

        setIsPrefilled(true);
    }, [clientData, isPrefilled]);

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

