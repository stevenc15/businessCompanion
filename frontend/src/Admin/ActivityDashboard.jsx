import {useState, useEffect, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './ActivityDashboard.css';
import ChecklistCell from './components/Checklist';

//Admin Dashboard
function ActivityDashboard() {
    
  //navigate functionality
  const navigate = useNavigate();
  
  //activities object
  const [activities, setActivities] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

 
  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try{
    const res = await fetch('https://businesscompanion.onrender.com/admin/getActivities', {
      credentials: 'include',
    });
    const data = await res.json();
    if (!data) {
      console.log('no activities available');
    }
    setActivities(data);
    setAllActivities(data);
  }catch(error){
    console.log(error);
  }finally{
    setLoading(false);
  }
  }, []); // No dependencies for now

  //to be called when activities is populated, once
  useEffect(() => {     
      fetchActivities();
  }, [fetchActivities]);

  useEffect (() => {    
    const filtered = allActivities.filter((activity) => 
      Object.values(activity).some((value) => 
        value?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setActivities(filtered);
  }, [query, allActivities]);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editActivityID, setEditActivityID] = useState(null);
  const [deleteActivityID, setDeleteActivityID] = useState(null);

  //define form data object
  const [formData, setFormData] = useState({
    EmployeeName: '', 
    Community: '', 
    ClientName: '', 
    Address: '',  
    Service: '',
    ReviewWeeklySchedule: false,
    CheckMailbox: false,
    ViewFrontOfTheHouse: false,
    TurnOnMainWater: false,
    BugsInsideOutsideFrontDoor: false,
    Ceilings: false,
    Floors: false,
    CloseClosets: false,
    TurnToiletsOnOff: false,
    GarageCeiling: false,
    GarageFloor: false,
    AnyGarageFridge: false,
    AcAirHandlerDrainLine: false,
    TurnOnOffWaterHeaterInElectricalPanel: false,
    TurnOnOffIceMachine: false,
    ThermostatSetTo78ForClose72ForOpening: false,
    ViewRearOfTheHouse: false,
  });

  //function to change form data
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;

    setFormData((prev) => ({
       ...formData, 
       [name]: type === 'checkbox' ? checked:value
      })
    );
  };  

  //function to set activity to approved state
  const handleApprove = async (ActivityId) => {
      const res = await fetch(`https://businesscompanion.onrender.com/admin/approve`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({ActivityId}),
          credentials: 'include',
      });
      const data=await res.json();
      console.log("approved data response: ", data);
      console.log("approved data response: ", res.status);
      await fetchActivities();
  };

  //function to set activity to unapproved state
  const handleUnapprove = async (ActivityId) => {
      await fetch(`https://businesscompanion.onrender.com/admin/unapprove`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({ActivityId}),
          credentials: 'include',
      });
      await fetchActivities();
  };

  //log submission function
  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData, 
      ActivityId:editActivityID
    };
    const res = await fetch('https://businesscompanion.onrender.com/admin/editActivity', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedData),
      credentials: 'include',
    });
    if (res.ok){
      fetchActivities();
      setEditModal(false);
      setEditActivityID(null);
      const data = await res.json();
      alert(data.message || 'Submitted!');
    }else {
      console.error('Failed to edit Activity');
    }
    
  };

  const handleDelete = async (e) => {
    const res = await fetch('https://businesscompanion.onrender.com/admin/deleteActivity', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ActivityId: deleteActivityID}),
      credentials: 'include',
    });

    if (res.ok){
      fetchActivities();
      setDeleteModal(false);
      setDeleteActivityID(null);
    }else {
      console.error('Failed to delete Activity');
    }
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
              navigate('/');
            }}
          >
            Logout
          </button>

          {/*To Client Dashboard*/}
          <button 
            className="go-back-button"
            onClick={() => {
              navigate('/clientDashboard');
            }}
          >
            Go to Client Dashboard
          </button>

          {/*Add Activity*/}
          <button 
            className="add-button"
            onClick={() => {
              navigate('/addActivity'); 
            }}
          >
            Add Activity
          </button>
        </div>

      </div> {/*End of Header*/}
    
      {/*Main Content CONTAINER*/}
      <div className="dashboard-content">
        
        {/*Title CONTAINER*/}
        <div className="dashboard-title-section">
          <h2 className="dashboard-title">Activity Dashboard</h2> {/*title*/}
          
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
                  {activities.filter(activity => activity.Status).length}
              </span>              
              <span className="stat-label">Approved</span>
            </div>

            {/*number of unapproved activities*/}
            <div className="stat-item">                  
              <span className="stat-value">
                {activities.filter(activity => !activity.Status).length}
              </span>              
              <span className="stat-label">Pending</span>
            </div>

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
            
          </div> {/*end of dashboard stats*/} 
        </div> {/*end of title*/} 
    
        {/*table of activities*/} 
        <div className="data-table-container">
          
          <div className="table-header"> {/*top of table details*/} 
            <h3 className="table-title">Activity Records</h3>            
            
            {/*refresh data button, ADD FUNCTIONALITY*/} 
            <div className="table-actions">
              <button className="refresh-button" onClick={fetchActivities}>Refresh Data</button>
            </div>
          </div>

          {loading && <div className="spinner"></div>}

          {/*actual table*/}   
          <div className="table-responsive">
                
            <table className="data-table w-full table-auto">
                  
              {/*table columns*/} 
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Community</th>
                  <th>Client Name</th>
                  <th>Address</th>
                  <th>Service</th>
                  <th>Review Weekly Schedule</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/*table contents*/} 
              <tbody>
                
                {/*activities.length>0 show table*/} 
                {activities.length > 0 ? (
                  // sort by ActivityId ascending
                  activities
                  .slice() // copy the array to avoid mutating the original
                  .sort((a, b) => a.ActivityId - b.ActivityId)
                  //activities present
                  .map( (activity) => (
                    
                    //set id as key, tr = table row
                    <tr key={activity.ActivityId}>
                      
                      {/*EmployeeName*/}
                      <td>{activity.EmployeeName}</td>
                      
                      {/*Community*/}
                      <td>{activity.Community}</td>

                      {/*Client Name*/}
                      <td>{activity.ClientName}</td>

                      {/*Address*/}
                      <td>{activity.Address}</td>
                      
                      {/*Service*/}
                      <td>{activity.Service}</td>
                      
                      {/*Checklist*/}
                      <td>{activity.ReviewWeeklySchedule ? '✅' : '⬜'}</td>

                      {/*status*/}
                      <td>
                        <span className={`status-badge ${activity.Status ? 'approved' : 'pending'}`}>
                          {activity.Status ? 'Approved' : 'Pending'}
                        </span>
                      </td>

                      {/*approve or disapprove button*/}
                      <td>
                      <div className="action-buttons-container">
                        {/*activity pending, approve button available*/}
                        {!activity.Status ? (
                          <button 
                            className="action-button approve"
                            onClick={() => handleApprove(activity.ActivityId)}
                          >
                            Approve
                          </button>
                        ) : (
                          //unapprove button
                          <button 
                            className="action-button revoke"
                            onClick={() => handleUnapprove(activity.ActivityId)}
                          >
                            Reject
                          </button>
                        )}

                       
                        
                          <button className="action-button action-button-modify" onClick={()=> {
                            setEditModal(true) 
                            setEditActivityID(activity.ActivityId)
                            setFormData({
                              EmployeeName: activity.EmployeeName,
                              Community: activity.Community,
                              Address: activity.Address,
                              DoorCode: activity.DoorCode,
                              Service: activity.Service,
                            });
                          }
                          }
                          >Modify</button>

                          <button className="action-button action-button-delete" onClick={()=> {
                            setDeleteModal(true) 
                            setDeleteActivityID(activity.ActivityId)}}
                          >Delete</button>

                        </div>
                      </td>
                      
                    </tr> //end of row
                  ))
                ) : ( 
                  //no activities present
                  <tr>
                    <td colSpan="6" className="no-data">No activity records found.</td>
                  </tr>
                )}

              </tbody>
            </table>

            {editModal && (
              <div className="modal-overlay">
              {/*logging form*/}
              <div className="form-card">

                {/*heading*/}
                <h2 className="form-title">Edit Activity info</h2>

                {/*logging form*/} 
                <form className="activity-form" onSubmit={(e) => {
                  handleEdit(e);
                  setFormData({ EmployeeName: '', Community: '', Address: '', DoorCode: '', Service: '' });
                  setEditActivityID(null);
                }}>
           
                  {/*name*/}
                  <div className="form-group">
                    <label htmlFor="name">Employee Name</label>
                    <input 
                      id="EmployeeName"
                      name="EmployeeName" 
                      value={formData.EmployeeName}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/*Community*/}    
                  <div className="form-group">
                    <label htmlFor="task">Community</label>
                    <input 
                      id="Community"
                      name="Community" 
                      value={formData.Community}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/*Address*/}    
                  <div className="form-group">
                    <label htmlFor="task">Address</label>
                    <input 
                      id="Address"
                      name="Address" 
                      value={formData.Address}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/*Door Code*/}    
                  <div className="form-group">
                    <label htmlFor="task">Door Code</label>
                    <input 
                      id="DoorCode"
                      name="DoorCode" 
                      value={formData.DoorCode}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/*Service*/}    
                  <div className="form-group">
                    <label htmlFor="task">Service</label>
                    <input 
                      id="Service"
                      name="Service" 
                      value={formData.Service}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>

                  {/*other options at the end*/} 
                  <div className="form-actions">
                    {/*submit button*/} 
                    <button type="submit" className="submit-button">
                      Confirm Changes
                    </button>
                    {/*cancel*/} 
                    <button type="button" className="back-button" onClick={()=>{
                      setEditModal(false)
                      setFormData({EmployeeName: '', Community: '', Address: '', DoorCode: '', Service: '' });
                      setEditActivityID(null);
                      }}>Cancel</button>
                  </div>

                </form> 

              </div> {/*end of form*/}
              </div>
            )}

            {deleteModal && (
              <div className="option-container">
                <div>
                  <p>Are you sure you want to delete?</p> {/* optional text */}
                  <button onClick={() => handleDelete(deleteActivityID)}>Confirm</button>
                  <button onClick={() => {
                  setDeleteModal(false);
                  setDeleteActivityID(null);
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
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

export default ActivityDashboard;