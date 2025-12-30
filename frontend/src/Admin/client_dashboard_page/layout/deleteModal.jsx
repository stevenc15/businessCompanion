/**
 * deleteModal.jsx - layout component for delete popup or modal in which 
 * confirmation of choice of deletion is requested
 */

import '../css/ClientDashboard.css';
import deleteClient from '../hooks/deleteClient';

export default function DeleteModal( {setDeleteModal, setDeleteClientID, deleteClientID, setLoading, setClients, setAllClients} ) {
    return (
        <div className="option-container">
                <div>
                  <p>Are you sure you want to delete?</p> {/* optional text */}
                  <button onClick={() => deleteClient(deleteClientID, setLoading, setClients, setAllClients, setDeleteModal)}>Confirm</button>
                  <button onClick={() => {
                  setDeleteModal(false);
                  setDeleteClientID(null);
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
    )
}