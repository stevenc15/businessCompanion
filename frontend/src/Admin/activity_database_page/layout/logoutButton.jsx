/**
 * logoutButton.jsx - logout button component for activity database page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ActivityDatabase.css';

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
