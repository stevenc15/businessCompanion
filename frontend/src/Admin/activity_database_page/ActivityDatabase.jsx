/**
 * ActivityDatabase.jsx - main file that renders the activity database page by importing
 * various components and creating various usestates
 */

import { useState, useEffect } from 'react';
import './css/ActivityDatabase.css';
import ActivityDatabaseHeader from './layout/activityDatabaseHeader';
import LogoutButton from './layout/logoutButton';
import BackToClientDashboardButton from './layout/backToClientDashboardButton';
import BackToActivityDashboardButton from './layout/backToActivityDashboardButton';
import HelpButton from './layout/helpButton';
import ActivityDatabaseStats from './layout/activityDatabaseStats';
import SortControls from './layout/sortControls';
import TableHeader from './layout/tableHeader';
import ActivityTable from './layout/activityTable';
import ActivityDetailsModal from './layout/activityDetailsModal';
import DeleteActivityModal from './layout/deleteActivityModal';
import AdminFooter from './layout/footer';
import fetchActivityData from './hooks/fetchActivityData';
import searchActivityFilter from './hooks/searchFilter';
import toggleActivityStatus from './hooks/toggleActivityStatus';

function ActivityDatabase() {

  //Activities object
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: 'date', order: 'newest' });

  const [detailsModal, setDetailsModal] = useState(false);
  const [detailsActivity, setDetailsActivity] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteActivityId, setDeleteActivityId] = useState(null);

  useEffect(() => {
    fetchActivityData(setLoading, setActivities, setAllActivities);
  }, []);

  //Trigger when search query changes
  useEffect(() => {
    searchActivityFilter(setActivities, allActivities, query);
  }, [query, allActivities]);

  return (

    //Main CONTAINER
    <div className="dashboard-container">

      {/*Header CONTAINER*/}
      <div className="dashboard-header">

        <ActivityDatabaseHeader />

        <div className="header-actions">

          <LogoutButton />

          <BackToClientDashboardButton />

          <BackToActivityDashboardButton />

          <HelpButton />

        </div>

      </div> {/*End of Header*/}

      {/*Main Content CONTAINER*/}
      <div className="dashboard-content">

        {/*Title CONTAINER*/}
        <div className="dashboard-title-section">
          <h2 className="dashboard-title"> Activity Database </h2> {/*title*/}

          <ActivityDatabaseStats activities={activities} query={query} setQuery={setQuery} />
        </div> {/*end of title*/}

        <SortControls sortConfig={sortConfig} setSortConfig={setSortConfig} />

        {/*table of activities*/}
        <div className="data-table-container">

          <TableHeader setLoading={setLoading} setActivities={setActivities} setAllActivities={setAllActivities} />

          {loading && <div className="spinner"></div>}

          {/*actual table container*/}
          <div className="table-responsive">

            <ActivityTable
              activities={activities}
              sortConfig={sortConfig}
              setDetailsActivity={setDetailsActivity}
              setDetailsModal={setDetailsModal}
              setDeleteModal={setDeleteModal}
              setDeleteActivityId={setDeleteActivityId}
              onToggleStatus={(ActivityId) => toggleActivityStatus(ActivityId, setLoading, setActivities, setAllActivities)}
            />

            {detailsModal && detailsActivity && (
              <ActivityDetailsModal
                activity={detailsActivity}
                setDetailsModal={setDetailsModal}
              />
            )}

            {deleteModal && (
              <DeleteActivityModal
                setDeleteModal={setDeleteModal}
                setDeleteActivityId={setDeleteActivityId}
                deleteActivityId={deleteActivityId}
                setLoading={setLoading}
                setActivities={setActivities}
                setAllActivities={setAllActivities}
              />
            )}

          </div>
        </div>
      </div>

        <AdminFooter />
    </div>
  );
};

export default ActivityDatabase;
