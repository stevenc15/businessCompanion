/**
 * dashboard header component
 */
import '../css/ClientDashboard.css';

export default function ClientDashboardHeader() {
    return (
        <div>
            <div className="company-logo">
                <div className="logo-placeholder">AL</div> {/*Logo*/}
            </div>
      
            <h1 className="app-name">Activity Logger</h1> {/*Title*/}
        </div>
    );
}