/**
 * tableHeader.jsx - layout table header for client dashboard page
 */
import React from 'react';
import '../css/ClientDashboard.css';

import useFetchClientData from '../hooks/fetchClientData';

export default function TableHeader() {
    return (
        <div className="table-header"> {/*top of table details*/} 
            <h3 className="table-title">Client Records</h3>            
            
            {/*refresh data button, ADD FUNCTIONALITY*/} 
            <div className="table-actions">
              <button className="refresh-button" onClick={useFetchClientData}>Refresh Data</button>
            </div>
          </div>
    );
}