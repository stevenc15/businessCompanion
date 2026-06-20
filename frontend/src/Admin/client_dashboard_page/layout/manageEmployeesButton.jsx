/**
 * manageEmployeesButton.jsx - navigates admin to the employee whitelist management page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function ManageEmployeesButton() {
    const navigate = useNavigate();
    return (
        <button
            className="add-button"
            onClick={() => navigate('/employeeManagement')}
        >
            Manage Employees
        </button>
    );
}
