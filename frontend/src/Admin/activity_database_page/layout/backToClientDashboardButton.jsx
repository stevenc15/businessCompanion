/**
 * backToClientDashboardButton.jsx - navigates admin back to the client dashboard
 */
import { useNavigate } from 'react-router-dom';
import '../css/ActivityDatabase.css';

export default function BackToClientDashboardButton() {
    const navigate = useNavigate();
    return (
        <button
            className="go-back-button"
            onClick={() => navigate('/clientDashboard')}
        >
            Client Dashboard
        </button>
    );
}
