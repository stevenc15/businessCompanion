/**
 * toEULAagreement.jsx - component button for going to EULA agreement page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ActivityDashboard.css';

export default function ToEULAagreement() {
    const navigate = useNavigate();

    return (
        <button 
            className="go-back-button"
            onClick={() => {
                navigate('/endUserAgreement');
            }}
        >
            Go to EULA Agreement
        </button>
    )
}
