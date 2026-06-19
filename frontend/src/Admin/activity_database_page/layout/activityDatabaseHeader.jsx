/**
 * activityDatabaseHeader.jsx - dashboard header component for the activity database page
 */
import '../css/ActivityDatabase.css';

export default function ActivityDatabaseHeader() {
    return (
        <div>
            <div className="company-logo">
                <div className="logo-placeholder">AL</div> {/*Logo*/}
            </div>

            <h1 className="app-name">Activity Logger</h1> {/*Title*/}
        </div>
    );
}
