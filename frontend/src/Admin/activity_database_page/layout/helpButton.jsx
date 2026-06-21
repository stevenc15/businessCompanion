/**
 * helpButton.jsx - navigates admin to the reference/help page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ActivityDatabase.css';

export default function HelpButton() {
    const navigate = useNavigate();
    return (
        <button
            className="help-button"
            onClick={() => navigate('/adminHelp')}
        >
            Help
        </button>
    );
}
