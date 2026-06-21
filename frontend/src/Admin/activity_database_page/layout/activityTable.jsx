/**
 * activityTable.jsx - layout component for the activities table in which the admin can
 * view a checklist, edit, delete, or toggle the processed status of any activity record
 */

import { useNavigate } from 'react-router-dom';
import '../css/ActivityDatabase.css';

function formatDate(dateString) {
    return new Date(dateString).toLocaleString('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
}

export default function ActivityTable({
    activities,
    sortConfig,
    setDetailsActivity,
    setDetailsModal,
    setDeleteModal,
    setDeleteActivityId,
    onToggleStatus,
}) {
    const navigate = useNavigate();

    const sortedActivities = activities.slice().sort((a, b) => {
        if (sortConfig.field === 'status') {
            if (a.Status === b.Status) return 0;
            const aFirst = sortConfig.order === 'processedFirst' ? a.Status : !a.Status;
            return aFirst ? -1 : 1;
        }

        const aTime = new Date(a.createdAt).getTime();
        const bTime = new Date(b.createdAt).getTime();
        return sortConfig.order === 'oldest' ? aTime - bTime : bTime - aTime;
    });

    return (
        <table className="data-table">

              {/*table columns*/}
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Community</th>
                  <th>Client Name</th>
                  <th>Address</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Details</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/*table contents*/}
              <tbody>

                {sortedActivities.length > 0 ? (
                  sortedActivities.map((activity) => (

                    <tr key={activity.ActivityId}>

                      {/*5 main string variables*/}
                      <td>{activity.EmployeeName}</td>
                      <td>{activity.Community}</td>
                      <td>{activity.ClientName}</td>
                      <td>{activity.Address}</td>
                      <td>{activity.Service}</td>

                      {/*Date*/}
                      <td>{formatDate(activity.createdAt)}</td>

                      {/*Status — placeholder for eventual QuickBooks integration*/}
                      <td>
                        <span className={`status-badge ${activity.Status ? 'approved' : 'pending'}`}>
                          {activity.Status ? 'Processed' : 'Pending'}
                        </span>
                      </td>

                      {/*click-more checklist details*/}
                      <td>
                        <button
                          className="action-button action-button-details"
                          onClick={() => {
                            setDetailsActivity(activity);
                            setDetailsModal(true);
                          }}
                        >View Checklist</button>
                      </td>

                      {/*actions*/}
                      <td>
                        <div className="action-buttons-container">

                          <button
                            className={`action-button ${activity.Status ? 'action-button-unprocess' : 'action-button-process'}`}
                            onClick={() => onToggleStatus(activity.ActivityId)}
                          >{activity.Status ? 'Mark Pending' : 'Process'}</button>

                          <button
                            className="action-button action-button-modify"
                            onClick={() => navigate(`/activityForm?ActivityId=${activity.ActivityId}`)}
                          >Edit</button>

                          <button
                            className="action-button action-button-delete"
                            onClick={() => {
                              setDeleteActivityId(activity.ActivityId);
                              setDeleteModal(true);
                            }}
                          >Delete</button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">No activity records found.</td>
                  </tr>
                )}

              </tbody>
            </table>
    );
}
