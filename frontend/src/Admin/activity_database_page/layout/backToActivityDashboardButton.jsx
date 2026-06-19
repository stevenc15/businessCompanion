/**
 * backToActivityDashboardButton.jsx - navigates admin back to the Google Sheet activity dashboard
 */
import { useNavigate } from 'react-router-dom';
import '../css/ActivityDatabase.css';

export default function BackToActivityDashboardButton() {
    const navigate = useNavigate();
    return (
        <button
            className="go-back-button"
            style={{ backgroundColor: '#3182ce' }}
            onClick={() => navigate('/activityDashboard')}
        >
            Go to Activity Dashboard
        </button>
    );
}
