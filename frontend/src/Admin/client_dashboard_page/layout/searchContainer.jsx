/**
 * searchContainer - layout component for the dashboard stats section's search feature
 */

import '../css/ClientDashboard.css';

export default function SearchContainer({ query, setQuery }) {
    return (
        <div className="search-container">
              <span className="search-label">Search</span>
              <div className="search-input-wrapper">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
                <input
                  type="text"
                  className="search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by any field"
                />
              </div>
            </div>
    );
}