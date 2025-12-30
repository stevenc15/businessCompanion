/**
 * toEulaAgreementDocument.jsx - component button for going to EULA agreement page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function ToEulaagreement() {
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
