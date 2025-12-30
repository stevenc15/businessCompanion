/**
 * dashboardStats.jsx - layout component for dashboard stats
 */

import '../css/ClientDashboard.css';
import SearchContainer from './searchContainer';

export default function DashboardStats({ clients, query, setQuery }) {
    return (
        <div className="dashboard-stats">
            
            {/*Total Activities*/}
            <div className="stat-item">
              <span className="stat-value">{clients.length}</span>
              <span className="stat-label">Total Clients</span>
            </div>

            <SearchContainer query={query} setQuery={setQuery} />

          </div> 
    );
}
