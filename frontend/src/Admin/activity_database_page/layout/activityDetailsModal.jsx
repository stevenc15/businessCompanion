/**
 * activityDetailsModal.jsx - read-only modal that shows the full checklist (boolean values)
 * for a single activity record
 */

import '../css/ActivityDatabase.css';
import { CHECKLISTITEMS } from '../../../Employee/employee_form_page/config/checklistConfig';

export default function ActivityDetailsModal({ activity, setDetailsModal }) {
    return (
        <div className="modal-overlay">
            <div className="form-card" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

                <h2 className="form-title">Checklist — {activity.ClientName}</h2>

                <ul className="checklist-details-list">
                    {CHECKLISTITEMS.map(item => (
                        <li key={item.id} className="checklist-details-item">
                            <span className={`checklist-mark ${activity[item.id] ? 'checked' : 'unchecked'}`}>
                                {activity[item.id] ? '✓' : '✗'}
                            </span>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>

                <div className="form-actions">
                    <button type="button" className="back-button" onClick={() => setDetailsModal(false)}>Close</button>
                </div>

            </div>
        </div>
    );
}
