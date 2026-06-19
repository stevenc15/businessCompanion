/**
 * sortControls.jsx - sort by date / sort by status dropdowns for the activity database table
 */
import '../css/ActivityDatabase.css';

export default function SortControls({ sortConfig, setSortConfig }) {
    return (
        <div className="sort-container">
            <div className="sort-group">
              <label className="sort-label" htmlFor="sortByDate">Sort by Date</label>
              <select
                id="sortByDate"
                className="sort-select"
                value={sortConfig.field === 'date' ? sortConfig.order : ''}
                onChange={(e) => setSortConfig({ field: 'date', order: e.target.value })}
              >
                <option value="" disabled>Select...</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            <div className="sort-group">
              <label className="sort-label" htmlFor="sortByStatus">Sort by Status</label>
              <select
                id="sortByStatus"
                className="sort-select"
                value={sortConfig.field === 'status' ? sortConfig.order : ''}
                onChange={(e) => setSortConfig({ field: 'status', order: e.target.value })}
              >
                <option value="" disabled>Select...</option>
                <option value="pendingFirst">Pending First</option>
                <option value="processedFirst">Processed First</option>
              </select>
            </div>
        </div>
    );
}
