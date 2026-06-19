/**
 * activityModal.jsx - modal that lets the admin log an activity for a client,
 * using the same form fields and checklist as the employee form.
 */

import { useState } from 'react';
import '../css/ClientDashboard.css';
import '../.././../Employee/employee_form_page/css/EmployeeForm.css';
import Checklist from '../../../Employee/employee_form_page/layout/checklist';
import changeForm from '../../../Employee/employee_form_page/services/changeForm';
import submitForm from '../../../Employee/employee_form_page/services/submitForm';
import { CHECKLISTITEMS } from '../../../Employee/employee_form_page/config/checklistConfig';
import { FORMDEFAULT } from '../../../Employee/employee_form_page/config/formDefault';
import { API_URL } from '../../../config/api';

export default function ActivityModal({ client, setActivityModal }) {

    const [formData, setFormData] = useState({
        ...FORMDEFAULT,
        Community: client.Community,
        ClientName: client.ClientName,
        Address: client.Address,
    });
    const [submitting, setSubmitting] = useState(false);

    function handleClose() {
        setFormData({ ...FORMDEFAULT, Community: client.Community, ClientName: client.ClientName, Address: client.Address });
        setActivityModal(false);
    }

    // The employee submission endpoint requires the same signed link token
    // employees get emailed; mint a short-lived one for this client so the
    // admin can submit through the same authenticated path.
    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const tokenRes = await fetch(`${API_URL}/admin/activities/getActivityToken?ClientId=${client.ClientId}`, {
                credentials: 'include',
            });
            if (!tokenRes.ok) {
                alert('Failed to authorize activity submission');
                return;
            }
            const { token } = await tokenRes.json();
            await submitForm(e, { ...formData, token }, (reset) => { setFormData(reset); setActivityModal(false); });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="form-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

                <h2 className="form-title">Log Activity — {client.ClientName}</h2>

                <form className="activity-form" onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="EmployeeName">Your Name</label>
                        <input
                            id="EmployeeName"
                            name="EmployeeName"
                            placeholder="Enter your full name"
                            value={formData.EmployeeName}
                            onChange={(e) => changeForm(setFormData, e)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Community</label>
                        <input readOnly value={formData.Community} className="form-input" />
                    </div>

                    <div className="form-group">
                        <label>Client Name</label>
                        <input readOnly value={formData.ClientName} className="form-input" />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input readOnly value={formData.Address} className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="Service">Service</label>
                        <input
                            id="Service"
                            name="Service"
                            placeholder="Describe service"
                            value={formData.Service}
                            onChange={(e) => changeForm(setFormData, e)}
                            className="form-input"
                        />
                    </div>

                    <Checklist
                        checklistItems={CHECKLISTITEMS}
                        formData={formData}
                        handleChange={(e) => changeForm(setFormData, e)}
                    />

                    <div className="form-actions">
                        <button type="submit" className="submit-button" disabled={submitting}>
                            {submitting ? 'Submitting...' : 'Submit Activity'}
                        </button>
                        <button type="button" className="back-button" onClick={handleClose}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
