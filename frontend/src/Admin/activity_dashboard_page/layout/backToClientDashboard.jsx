/**
 * backToClientDashboard.jsx - component button for back to client dashboard button
 */

import { useNavigate } from 'react-router-dom';
import '../css/ActivityDashboard.css';

export default function BackToClientDashboard() {
    const navigate = useNavigate();

    return (
        <button 
            className="go-back-button"
                    
            onClick={() => {
                navigate('/clientDashboard');
            }}
        >
            Go to Client Dashboard
        </button>
    )
}