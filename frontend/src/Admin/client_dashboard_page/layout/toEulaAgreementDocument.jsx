/**
 * toEulaAgreementDocument.jsx - component button for going to EULA agreement page
 */
import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function ToEulaagreement() {
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
