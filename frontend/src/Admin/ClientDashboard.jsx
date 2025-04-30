import {useState, useEffect, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './ClientDashboard.css';

//Admin Dashboard
function ClientDashboard() {
    
  //navigate functionality
  const navigate = useNavigate();
  
  //Clients object
  const [clients, setClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [qrCode, setQRCode] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editClientID, setEditClientID] = useState(null);
  const [deleteClientID, setDeleteClientID] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  //define form data object
  const [formData, setFormData] = useState({ClientName: '', Address: '', Email: ''});

  //function to change form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  useEffect (() => {    
    const filtered = allClients.filter((client) => 
      Object.values(client).some((value) => 
        value?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setClients(filtered);
  }, [query, allClients]);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try{
    const res = await fetch('https://businesscompanion.onrender.com/admin/getClients', {
      credentials: 'include',
    });
    const data = await res.json();
    if (!data) {
      console.log('no Clients available');
    }
    setClients(data);
    setAllClients(data);
  }catch(error){
    console.error('Failed to get client data');
  }finally{
    setLoading(false);
  }
  }, []); // No dependencies for now

  //to be called when Clients is populated, once
  useEffect(() => {     
      fetchClients();
  }, [fetchClients]);

  
  //log submission function
  const handleEdit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,      // includes ClientName, Address, Email
      ClientId: editClientID, // add your editClientId here
    };

    const res = await fetch('https://businesscompanion.onrender.com/admin/editClient', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedData),
      credentials: 'include',
    });

    if (res.ok){
      await fetchClients();

      const data = await res.json();
      alert(data.message || 'Submitted!');
      setEditModal(false);
      setEditClientID(null);
    
    }else {
      console.error('Failed to edit client');
    }

  };

  const handleDelete = async () => {
    const res = await fetch('https://businesscompanion.onrender.com/admin/deleteClient', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ClientId: deleteClientID}),
      credentials: 'include',
    });

    if (res.ok){
      fetchClients();
      setDeleteModal(false);
      setDeleteClientID(null);
    }else {
      console.error('Failed to delete client');
    }
  };

  const handleQR = async (ClientId) => {
    const res = await fetch('https://businesscompanion.onrender.com/admin/getQR', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ClientId}),
      credentials: 'include',
    });

    if (res.ok){
      const data = await res.json();
      setQRCode(data.qrCode);
    }else{
      const errorData = await res.text();
      console.error('error getting qrcode: ', errorData);
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

          {/*Back to Activity Dashboard*/}
          <button 
            className="go-back-button"
            onClick={() => {
              navigate('/activityDashboard');
            }}
          >
            Go back to Activity Dashboard
          </button>

          {/*Add Client*/}
          <button 
            className="add-button"
            onClick={() => {
              navigate('/addClient');
            }}
          >
            Add Client
          </button>

        </div>

      </div> {/*End of Header*/}
    
      {/*Main Content CONTAINER*/}
      <div className="dashboard-content">
        
        {/*Title CONTAINER*/}
        <div className="dashboard-title-section">
          <h2 className="dashboard-title"> Client Dashboard </h2> {/*title*/}
          
          {/*Dashboard/table stats*/}
          <div className="dashboard-stats">
            
            {/*Client Stats*/}
            
            {/*Total Activities*/}
            <div className="stat-item">
              <span className="stat-value">{clients.length}</span>
              <span className="stat-label">Total Clients</span>
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
            
        

        {/*table of clients*/} 
        <div className="data-table-container">
          
          <div className="table-header"> {/*top of table details*/} 
            <h3 className="table-title">Client Records</h3>            
            
            {/*refresh data button, ADD FUNCTIONALITY*/} 
            <div className="table-actions">
              <button className="refresh-button" onClick={fetchClients}>Refresh Data</button>
            </div>
          </div>

          {loading && <div className="spinner"></div>}
          
          {/*actual table*/}   
          <div className="table-responsive">
                
            <table className="data-table">
                  
              {/*table columns*/} 
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/*table contents*/} 
              <tbody>
                
                {/*clients.length>0 show table*/} 
                {clients.length > 0 ? (
                  //clients present
                  clients
                  .slice()
                  .sort((a,b)=>a.ClientId-b.ClientId)
                  .map( (client) => (
                    
                    //set id as key, tr = table row
                    <tr key={client.ClientId}>
                      
                      {/*ClientName*/}
                      <td>{client.ClientName}</td>
                      
                      {/*Address*/}
                      <td>{client.Address}</td>
                      
                      {/*Email*/}
                      <td>{client.Email}</td>

                      {/*actions*/}
                      <td>

                      <div className="action-buttons-container">
                        
                        <button className="action-button action-button-qr" onClick={() => handleQR(client.ClientId)}>QR code</button>
                        
                        <button className="action-button action-button-modify" onClick={()=> {
                          setEditModal(true) 
                          setEditClientID(client.ClientId)
                          setFormData({
                            ClientName: client.ClientName,
                            Address: client.Address,
                            Email: client.Email
                          });
                        }
                        }
                        >Modify</button>

                        <button className="action-button action-button-delete" onClick={()=> {
                          setDeleteModal(true) 
                          setDeleteClientID(client.ClientId)}}
                        >Delete</button>

                      </div>

                      </td>
                      
                    </tr> //end of row
                  ))
                ) : ( 
                  //no clients present
                  <tr>
                    <td colSpan="4" className="no-data">No client records found.</td>
                  </tr>
                )}

              </tbody>
            </table>
            
            {qrCode && (
              <>
              <img src={qrCode} alt="Scan me!" />
              <button onClick={ () => setQRCode(null)}>Close QR Code</button> 
              </>
            )}

            {editModal && (
              <div className="modal-overlay">
              {/*logging form*/}
              <div className="form-card">

                {/*heading*/}
                <h2 className="form-title">Edit Client info</h2>

                {/*logging form*/} 
                <form className="activity-form" onSubmit={(e) => {
                  handleEdit(e);
                  setFormData({ ClientName: '', Address: '', Email: '' });
                  setEditClientID(null);
                }}>
          
                  {/*name*/}
                  <div className="form-group">
                    <label htmlFor="name">Client Name</label>
                    <input 
                      id="ClientName"
                      name="ClientName" 
                      value={formData.ClientName}
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

                  {/*Email*/}    
                  <div className="form-group">
                    <label htmlFor="task">Email</label>
                    <input 
                      id="Email"
                      name="Email" 
                      value={formData.Email}
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
                      setFormData({ClientName: '', Address: '', Email: ''});
                      setEditClientID(null);
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
                  <button onClick={() => handleDelete(deleteClientID)}>Confirm</button>
                  <button onClick={() => {
                  setDeleteModal(false);
                  setDeleteClientID(null);
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

export default ClientDashboard;