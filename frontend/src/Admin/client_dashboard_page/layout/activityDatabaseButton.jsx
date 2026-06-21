/**
 * activityDatabaseButton.jsx - navigates admin to the activity database page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function ActivityDatabaseButton() {
    const navigate = useNavigate();
    return (
        <button
            className="go-back-button"
            style={{ backgroundColor: '#3182ce', marginRight: '0.75rem' }}
            onClick={() => navigate('/activityDatabase')}
        >
            Activity Database
        </button>
    );
}
