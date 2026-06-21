/**
 * activityDatabaseButton.jsx - navigates admin to the activity database page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ActivityDashboard.css';

export default function ActivityDatabaseButton() {
    const navigate = useNavigate();
    return (
        <button
            className="go-back-button"
            style={{ backgroundColor: '#3182ce' }}
            onClick={() => navigate('/activityDatabase')}
        >
            Activity Database
        </button>
    );
}
