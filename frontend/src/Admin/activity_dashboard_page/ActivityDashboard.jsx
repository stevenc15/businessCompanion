/**
 * ActivityDashboard Component
 * 
 * This component represents the dashboard for managing activities.
 * It includes a header with company logo, app name, and actions like logout, go to client dashboard, and go to EULA agreement.
 * The main content section displays a title and an iframe to embed a Google Sheet for managing activities.
 * Additionally, there is a button to export the data to Excel.
 * The footer contains copyright information and version details.
 */

import './css/ActivityDashboard.css';
import useGetSheet from './hooks/getSheet';
import DashboardHeader from './layout/dashboardHeader';
import LogoutButton from './layout/logoutButton';
import BackToClientDashboard from './layout/backToClientDashboard';
import ToEULAagreement from './layout/toEULAagreement';
import GoogleSheetDisplay from './layout/googleSheetDisplay';
import SheetExport from './layout/sheetExport';
import AdminActivityFooter from './layout/adminActivityFooter';
import ActivityDashboardTitle from './layout/activityDashboardTitle';

function ActivityDashboard () {

    // HOOKS MAKE get sheet url hook
    const sheetUrl = useGetSheet();
    console.log("Sheet URL:", sheetUrl);
    
    return (
      
    //Main CONTAINER
    <div className="dashboard-container">
      
        {/*Header CONTAINER*/}
        <div className="dashboard-header">
      
            <DashboardHeader />
      
            <div className="header-actions">        

                <LogoutButton />

                <BackToClientDashboard />

                <ToEULAagreement />
            </div>

        </div> {/*End of Header*/}
  
        {/*Main Content CONTAINER*/}
        <div className="dashboard-content">

            <ActivityDashboardTitle />

            <GoogleSheetDisplay sheetUrl={sheetUrl} />
            
            <SheetExport />

            <AdminActivityFooter />

        </div>
    
    </div>
    );

};

export default ActivityDashboard;