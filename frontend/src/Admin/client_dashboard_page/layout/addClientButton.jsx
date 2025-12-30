/**
 * addClientButton.jsx - layout component button to add a new client from 
 * the client dashboard page
 */

import { useNavigate } from 'react-router-dom';
import '../css/ClientDashboard.css';

export default function AddClientButton() {
    const navigate = useNavigate();
    return (
        <button 
            className="add-button"
            onClick={() => {
              navigate('/addClient');
            }}
          >
            Add Client
          </button>
    );
}