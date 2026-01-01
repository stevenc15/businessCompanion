/**
 * sheetExport.jsx - layout component for sheet export functionality
 */
import '../css/ActivityDashboard.css';
import { API_URL } from '../../../config/api';

export default function SheetExport() {
    const handleExport = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/dashboard/get-export-sheet`, {
                method: 'GET',
                credentials: 'include' // 🔑 THIS IS THE KEY
            });

            if (!response.ok) {
                throw new Error('Export failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'export.xlsx';
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error exporting sheet:', error);
        }
    };
    return(
        <button
            onClick={handleExport}
            style={{ marginTop: '20px', marginBottom: '20px', padding: '10px 20px' }}
        >
            Export to Excel
        </button>
    );
}