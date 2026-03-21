/**
 * googleSheetDisplay.jsx - layout component to display google sheet in iframe
 */
import '../css/ActivityDashboard.css';

export default function GoogleSheetDisplay({sheetUrl, loading}) {
    if (loading) return <div className="spinner"></div>;
    if (!sheetUrl) return <p>Unable to load sheet.</p>;
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