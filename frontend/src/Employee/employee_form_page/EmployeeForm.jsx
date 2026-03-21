/**
 * Main Employee submission form component
 * 
 * This component allows employees to log their activities and submit them to the system.
 * It includes fields for employee name, community, client name, address, and service description 
 * in the form of a checklist.
 * When submitted, this data will show up in a new row on the central Google Sheets file
 */

import {useState, useEffect, useRef} from 'react';
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

    //containers for form data
    const [formData, setFormData] = useState(FORMDEFAULT);

    const hasPrefilledRef = useRef(false);

    //fetch client data based on ClientId
    const [clientData, clientError] = useGetClientData(ClientId);

    const checklistItems = CHECKLISTITEMS;

    useEffect(() => {
        if (!clientData || hasPrefilledRef.current) return;
        setFormData(prev => ({
            ...prev,
            ClientName: clientData.ClientName,
            Address: clientData.Address,
            Community: clientData.Community,
        }));
        hasPrefilledRef.current = true;
    }, [clientData]);

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

                    {clientError && <p className="error-message">{clientError}</p>}

                    {/*logging form*/}
                    <form className="activity-form" onSubmit={(e) => submitForm(e, formData, setFormData)}>
            
                        <Form
                            formData={formData}
                            setFormData={setFormData}
                            changeForm={changeForm}
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

