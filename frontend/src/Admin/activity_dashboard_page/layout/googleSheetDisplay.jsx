/**
 * googleSheetDisplay.jsx - layout component to display google sheet in iframe
 */
import '../css/ActivityDashboard.css';

export default function GoogleSheetDisplay({sheetUrl, loading}) {
    if (loading) return <div className="spinner"></div>;
    if (!sheetUrl) return <p>Unable to load sheet.</p>;
    return (
        <div className="sheet-iframe-wrapper">
            <iframe
                src={sheetUrl}
                title="Google Sheet"
            />
        </div>
    );
}