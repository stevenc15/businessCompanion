/**
 * returnToClientDashboard.jsx - layout component for return to client dashboard button
 */

import '../css/AddClient.css'
import {Link} from 'react-router-dom';

export default function ReturnToClientDashboard() {
    return (
        <Link to='/clientDashboard' className="back-link">
            <button className="back-button">Return to Client Dashboard</button>
        </Link>
    );
}