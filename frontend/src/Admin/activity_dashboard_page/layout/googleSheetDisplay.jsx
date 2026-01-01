/**
 * googleSheetDisplay.jsx - layout component to display google sheet in iframe
 */
import '../css/ActivityDashboard.css';

export default function GoogleSheetDisplay({sheetUrl}) {
    return (
        <div>
            <iframe
                src={sheetUrl}
                width="100%"
                height="600"
                style={{ border: 'none' }}
                title="Google Sheet"
            />
        </div>
    );
}