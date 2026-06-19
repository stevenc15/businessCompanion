/**
 * ActivityForm.jsx - admin-only page to edit an existing activity record.
 *
 * Reached via the "Edit" action on the Activity Database page's table
 * (?ActivityId=<id> in the URL). Prefills all fields from the database and
 * saves changes back to the activities table only (the Google Sheet is just
 * a log of original submissions and isn't touched by edits).
 */

import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../client_dashboard_page/css/ClientDashboard.css';

import Checklist from '../../Employee/employee_form_page/layout/checklist';
import changeForm from '../../Employee/employee_form_page/services/changeForm';
import { CHECKLISTITEMS } from '../../Employee/employee_form_page/config/checklistConfig';

import fetchActivity from './hooks/fetchActivity';
import submitActivityEdit from './hooks/submitActivityEdit';

function ActivityForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const ActivityId = searchParams.get('ActivityId');

    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!ActivityId) {
            setError('Missing ActivityId — open this page via Edit on the Activity Database page.');
            setLoading(false);
            return;
        }
        fetchActivity(ActivityId, setFormData, setError, setLoading);
    }, [ActivityId]);

    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <div className="company-logo">
                    <div className="logo-placeholder">AL</div>
                </div>
                <h1 className="app-name">Activity Logger</h1>
            </div>

            <div className="dashboard-content">
                <div className="form-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

                    <h2 className="form-title">Edit Activity</h2>

                    {loading && <p>Loading...</p>}
                    {error && <p className="error-message">{error}</p>}

                    {formData && (
                        <form
                          className="activity-form"
                          onSubmit={(e) => submitActivityEdit(e, ActivityId, formData, navigate)}
                        >

                            <div className="form-group">
                                <label htmlFor="EmployeeName">Employee Name</label>
                                <input
                                  id="EmployeeName"
                                  name="EmployeeName"
                                  value={formData.EmployeeName}
                                  onChange={(e) => changeForm(setFormData, e)}
                                  className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Community">Community</label>
                                <input
                                  id="Community"
                                  name="Community"
                                  value={formData.Community}
                                  onChange={(e) => changeForm(setFormData, e)}
                                  className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ClientName">Client Name</label>
                                <input
                                  id="ClientName"
                                  name="ClientName"
                                  value={formData.ClientName}
                                  onChange={(e) => changeForm(setFormData, e)}
                                  className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Address">Address</label>
                                <input
                                  id="Address"
                                  name="Address"
                                  value={formData.Address}
                                  onChange={(e) => changeForm(setFormData, e)}
                                  className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="Service">Service</label>
                                <input
                                  id="Service"
                                  name="Service"
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
                                <button type="submit" className="submit-button">Save Changes</button>
                                <button
                                  type="button"
                                  className="back-button"
                                  onClick={() => navigate('/activityDatabase')}
                                >Return to Activity Database</button>
                            </div>

                        </form>
                    )}

                </div>
            </div>

        </div>
    );
}

export default ActivityForm;
