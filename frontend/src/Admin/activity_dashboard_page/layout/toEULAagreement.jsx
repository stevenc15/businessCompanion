/**
 * toEULAagreement.jsx - component button for going to EULA agreement page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ActivityDashboard.css';

export default function ToEULAagreement() {
    const navigate = useNavigate();

    return (
        <button
            className="eula-button"
            onClick={() => {
                navigate('/endUserAgreement');
            }}
        >
            EULA Agreement
        </button>
    )
}
