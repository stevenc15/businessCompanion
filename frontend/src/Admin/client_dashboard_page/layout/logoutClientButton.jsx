/**
 * logoutClientButton.jsx - logout button component for client dashboard page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function LogoutButton() {
    const navigate = useNavigate();

    return (
        <button 
            className="logout-button"
            onClick={() => {
            localStorage.removeItem('isAdmin');
            navigate('/');
            }}
        >
            Logout
        </button>
    )
}