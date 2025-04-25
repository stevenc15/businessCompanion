import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './AdminDashboard.css';

//Admin Dashboard
function AdminDashboard() {
    
  //navigate functionality
  const navigate = useNavigate();
  
  //activities object
  const [activities, setActivities] = useState([]);

  //to be called when there is a change in the isAdmin local storage object, once
  useEffect(() => {
      const isAdmin = localStorage.getItem('isAdmin');
      if (!isAdmin) {
          navigate('/adminlogin');
      }
  }, []);

  //to be called when activities is populated, once
  useEffect(() => {
      const fetchActivities = async () => {
          const res = await fetch('http://localhost:5001/api/activities');
          const data = await res.json();
          setActivities(data);
      };
      fetchActivities();
  }, []);

  //function to set activity to approved state
  const handleApprove = async (id) => {
      await fetch(`http://localhost:5001/api/activities/${id}/approve`, {
          method: 'PATCH',
      });
      setActivities((prev) => prev.map((activity) => 
          activity.id === id ? { ...activity, approved: true } : activity
      ));
  };

  //function to set activity to unapproved state
  const handleUnapprove = async (id) => {
      await fetch(`http://localhost:5001/api/activities/${id}/approve`, {
          method: 'PATCH',
      });
      setActivities((prev) => prev.map((activity) => 
          activity.id === id ? { ...activity, approved: false } : activity
      ));
  };

  return (

    //Main CONTAINER
    <div className="dashboard-container">
      
      {/*Header CONTAINER*/}
      <div className="dashboard-header">
        
        <div className="company-logo">
          <div className="logo-placeholder">AL</div> {/*Logo*/}
        </div>
        
        <h1 className="app-name">Activity Logger</h1> {/*Title*/}
        
        {/*Clickable elements of header*/}
        <div className="header-actions">
          
          {/*Logout*/}
          <button 
            className="logout-button"
            onClick={() => {
              localStorage.removeItem('isAdmin');
              navigate('/adminlogin');
            }}
          >
            Logout
          </button>

        </div>

      </div> {/*End of Header*/}
    
      {/*Main Content CONTAINER*/}
      <div className="dashboard-content">
        
        {/*Title CONTAINER*/}
        <div className="dashboard-title-section">
          <h2 className="dashboard-title">Admin Dashboard</h2> {/*title*/}
          
          {/*Dashboard/table stats*/}
          <div className="dashboard-stats">
            
            {/*Activity Stats*/}
            
            {/*Total Activities*/}
            <div className="stat-item">
              <span className="stat-value">{activities.length}</span>
              <span className="stat-label">Total Activities</span>
            </div>

            {/*number of approved activities*/}
            <div className="stat-item">              
              <span className="stat-value">
                  {activities.filter(activity => activity.approved).length}
              </span>              
              <span className="stat-label">Approved</span>
            </div>

            {/*number of unapproved activities*/}
            <div className="stat-item">                  
              <span className="stat-value">
                {activities.filter(activity => !activity.approved).length}
              </span>              
              <span className="stat-label">Pending</span>
            </div>

            
          </div> {/*end of dashboard stats*/} 
        </div> {/*end of title*/} 
    
        {/*table of activities*/} 
        <div className="data-table-container">
          
          <div className="table-header"> {/*top of table details*/} 
            <h3 className="table-title">Activity Records</h3>            
            {/*refresh data button*/} 
            <div className="table-actions">
              <button className="refresh-button">Refresh Data</button>
            </div>
          </div>

          {/*actual table*/}   
          <div className="table-responsive">
                
            <table className="data-table">
                  
              {/*table columns*/} 
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Task Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/*table contents*/} 
              <tbody>
                
                {/*activities.length>0 show table*/} 
                {activities.length > 0 ? {/*activities present*/} (
                  //per activity
                  activities.map( (activity) => (
                    
                    //set id as key, tr = table row
                    <tr key={activity.id}>
                      
                      {/*name*/}
                      <td>{activity.name}</td>
                      
                      {/*activity*/}
                      <td>{activity.task}</td>
                      
                      {/*status*/}
                      <td>
                        <span className={`status-badge ${activity.approved ? 'approved' : 'pending'}`}>
                          {activity.approved ? 'Approved' : 'Pending'}
                        </span>
                      </td>

                      {/*approve or disapprove button*/}
                      <td>
                        
                        {/*activity pending, approve button available*/}
                        {!activity.approved ? (
                          <button 
                            className="action-button approve"
                            onClick={() => handleApprove(activity.id)}
                          >
                            Approve
                          </button>
                        ) : {/*unapprove button*/} (
                          
                          <button 
                            className="action-button revoke"
                            onClick={() => handleUnapprove(activity.id)}
                          >
                            Reject
                          </button>
                        )}

                      </td>
                      
                    </tr> //end of row
                  ))
                ) : {/*no activities present*/} ( 
                  <tr>
                    <td colSpan="4" className="no-data">No activity records found.</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/*footer*/} 
      <div className="dashboard-footer">
        <p>© 2025 Company Name. All rights reserved.</p>
        <p className="version-info">Version 1.0.2</p>
      </div>
    </div>
  );
};

export default AdminDashboard;