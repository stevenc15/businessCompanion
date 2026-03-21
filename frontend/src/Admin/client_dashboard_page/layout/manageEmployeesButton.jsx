/**
 * manageEmployeesButton.jsx - navigates admin to the employee whitelist management page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function ManageEmployeesButton() {
    const navigate = useNavigate();
    return (
        <button
            className="go-back-button"
            style={{ backgroundColor: '#3182ce', marginRight: '0.75rem' }}
            onClick={() => navigate('/employeeManagement')}
        >
            Manage Employees
        </button>
    );
}
