/**
 * backToActivities.jsx - layout component to return to activities page from 
 * client dashboard
 */
import '../css/ClientDashboard.css';
import { useNavigate } from 'react-router-dom';

export default function ReturnToActivities() {
    const navigate = useNavigate();
    return (
        <button 
            className="go-back-button"
            onClick={() => {
              navigate('/activityDashboard');
            }}
          >
            Go back to Activity Dashboard
          </button>
    )
}