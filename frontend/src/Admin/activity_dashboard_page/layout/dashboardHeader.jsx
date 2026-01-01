/**
 * dashboard header component
 */
import '../css/ActivityDashboard.css';

export default function DashboardHeader() {
    return (
        <div>
            <div className="company-logo">
                <div className="logo-placeholder">AL</div> {/*Logo*/}
            </div>
      
            <h1 className="app-name">Activity Logger</h1> {/*Title*/}
        </div>
    );
}