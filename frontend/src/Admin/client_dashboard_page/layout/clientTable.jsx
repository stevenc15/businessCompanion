/**
 * clientTable.jsx - layout component for client table in which admin can select to edit,
 * delete or create a qr code for any and each admin
 */

import '../css/ClientDashboard.css';

export default function ClientTable( {clients, setQRModal, handleQR, setQRCodeAddress, setEditModal, setEditClientID, setFormData, setDeleteModal, setDeleteClientID, setActivityModal, setActivityClient, selectedClients, setSelectedClients} ) {

    const sortedClients = clients.slice().sort((a, b) => a.ClientId - b.ClientId);
    const allSelected = sortedClients.length > 0 && sortedClients.every(c => selectedClients.has(c.ClientId));

    function toggleSelectAll() {
        if (allSelected) {
            setSelectedClients(new Set());
        } else {
            setSelectedClients(new Set(sortedClients.map(c => c.ClientId)));
        }
    }

    function toggleSelect(clientId) {
        setSelectedClients(prev => {
            const next = new Set(prev);
            next.has(clientId) ? next.delete(clientId) : next.add(clientId);
            return next;
        });
    }

    return (
        <table className="data-table">

              {/*table columns*/}
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleSelectAll}
                      title="Select all"
                    />
                  </th>
                  <th>Client Name</th>
                  <th>Address</th>
                  <th>Community</th>
                  <th>Actions</th>
                </tr>
              </thead>

              {/*table contents*/}
              <tbody>

                {/*clients.length>0 show table*/}
                {sortedClients.length > 0 ? (
                  sortedClients.map( (client) => (

                    <tr key={client.ClientId} className={selectedClients.has(client.ClientId) ? 'row-selected' : ''}>

                      {/*Checkbox*/}
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedClients.has(client.ClientId)}
                          onChange={() => toggleSelect(client.ClientId)}
                        />
                      </td>

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

                        <button className="action-button action-button-activity" onClick={() => {
                          setActivityClient(client);
                          setActivityModal(true);
                        }}>Log Activity</button>

                        <button className="action-button action-button-delete" onClick={()=> {
                          setDeleteModal(true)
                          setDeleteClientID(client.ClientId)}}
                        >Delete</button>

                      </div>

                      </td>

                    </tr>
                  ))
                ) : (
                  //no clients present
                  <tr>
                    <td colSpan="5" className="no-data">No client records found.</td>
                  </tr>
                )}

              </tbody>
            </table>
    );
}
