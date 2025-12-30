/**
 * logoutButton.jsx - logout button component for activity dashboard page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ActivityDashboard.css';

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