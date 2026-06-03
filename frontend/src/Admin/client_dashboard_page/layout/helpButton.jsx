/**
 * helpButton.jsx - navigates admin to the reference/help page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function HelpButton() {
    const navigate = useNavigate();
    return (
        <button
            className="go-back-button"
            style={{ backgroundColor: '#6b7280', marginRight: '0.75rem' }}
            onClick={() => navigate('/adminHelp')}
        >
            Help
        </button>
    );
}
