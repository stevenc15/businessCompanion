/**
 * activityDatabaseStats.jsx - layout component for activity database stats
 */

import '../css/ActivityDatabase.css';
import SearchContainer from './searchContainer';

export default function ActivityDatabaseStats({ activities, query, setQuery }) {
    return (
        <div className="dashboard-stats">

            {/*Total Activities*/}
            <div className="stat-item">
              <span className="stat-value">{activities.length}</span>
              <span className="stat-label">Total Activities</span>
            </div>

            <SearchContainer query={query} setQuery={setQuery} />

          </div>
    );
}
