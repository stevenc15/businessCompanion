/**
 * clientTable.jsx - layout component for client table in which admin can select to edit,
 * delete or create a qr code for any and each admin
 */

import '../css/ClientDashboard.css';

export default function ClientTable( {clients, setQRModal, handleQR, setQRCodeAddress, setEditModal, setEditClientID, setFormData, setDeleteModal, setDeleteClientID} ) {
    return (
        <table className="data-table">
                  
              {/*table columns*/} 
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Address</th>
                  <th>Community</th>
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
                      
                      {/*Community*/}
                      <td>{client.Community}</td>

                      {/*actions*/}
                      <td>

                      <div className="action-buttons-container">
                        
                        <button className="action-button action-button-qr" onClick={(e) => {
                          e.preventDefault();
                          setQRModal(true)
                          handleQR(client.ClientId)
                          setQRCodeAddress(client.Address)
                          }}>QR code</button>
                        
                        <button className="action-button action-button-modify" onClick={()=> {
                          console.log("✏️ Modify clicked — client object:", client); 
                          setEditModal(true) 
                          setEditClientID(client.ClientId)
                          setFormData({
                            ClientName: client.ClientName,
                            Address: client.Address,
                            Community: client.Community
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
    );
}