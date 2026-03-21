/**
 * EmployeeForm.jsx - Employee activity log form.
 *
 * Requires:
 *  - A valid employee Google session (checked via /auth/employee/status)
 *  - A valid 24-hour signed token in the URL (?token=...)
 *
 * If the employee is not authenticated, they are redirected to the login page.
 * If the token is missing or expired, an error message is shown.
 */

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './css/EmployeeForm.css';

import useGetClientData from './hooks/useGetClientData';
import useEmployeeAuth from './hooks/useEmployeeAuth';
import submitForm from './services/submitForm';
import changeForm from './services/changeForm';

import Checklist from './layout/checklist';
import EmployeeHeader from './layout/employeeHeader';
import EmployeeFooter from './layout/employeeFooter';
import Form from './layout/form';

import { CHECKLISTITEMS } from './config/checklistConfig';
import { FORMDEFAULT } from './config/formDefault';
import { API_URL } from '../../config/api';

export default function EmployeeForm() {

    const [searchParams] = useSearchParams();
    const ClientId = searchParams.get('ClientId');
    const token = searchParams.get('token');

    const authStatus = useEmployeeAuth();
    const [formData, setFormData] = useState(FORMDEFAULT);
    const hasPrefilledRef = useRef(false);
    const [clientData, clientError] = useGetClientData(ClientId);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (authStatus === 'unauthenticated') {
            const currentUrl = window.location.href;
            window.location.href = `/employeeLogin?redirect=${encodeURIComponent(currentUrl)}`;
        }
    }, [authStatus]);

    // Pre-fill client fields once client data loads
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

    if (authStatus === 'loading') {
        return (
            <div className="employee-container">
                <EmployeeHeader />
                <div className="employee-content">
                    <p>Loading...</p>
                </div>
                <EmployeeFooter />
            </div>
        );
    }

    if (!token) {
        return (
            <div className="employee-container">
                <EmployeeHeader />
                <div className="employee-content">
                    <div className="form-card">
                        <h2 className="form-title">Invalid Link</h2>
                        <p>This link is missing a required token. Please use the link provided by your admin.</p>
                    </div>
                </div>
                <EmployeeFooter />
            </div>
        );
    }

    return (
        <div className="employee-container">
            <EmployeeHeader />
            <div className="employee-content">
                <div className="form-card">
                    <h2 className="form-title">Employee Activity Log</h2>
                    {clientError && <p className="error-message">{clientError}</p>}
                    <form className="activity-form" onSubmit={(e) => submitForm(e, { ...formData, token }, setFormData)}>
                        <Form formData={formData} setFormData={setFormData} changeForm={changeForm} />
                        <Checklist
                            checklistItems={CHECKLISTITEMS}
                            formData={formData}
                            handleChange={(e) => changeForm(setFormData, e)}
                        />
                        <div className="form-actions">
                            <button type="submit" className="submit-button">Submit Activity</button>
                        </div>
                    </form>
                </div>
            </div>
            <EmployeeFooter />
        </div>
    );
}
