/**
 * ClientDashboard.jsx - main file that renders entire client dashboard by importing various 
 * components and creating various usestates
 */

import {useState, useEffect} from 'react';
import './css/ClientDashboard.css';
import ClientDashboardHeader from './layout/clientDashboardHeader'; 
import LogoutButton from './layout/logoutClientButton';
import ReturnToActivities from './layout/backToActivities';
import AddClientButton from './layout/addClientButton';
import ToEulaagreement from './layout/toEulaAgreementDocument';
import { CLIENTFORMCONFIG } from '../add_client_page/config/clientForm'; 
import searchClientFilter from './hooks/searchFilter';
import getQR from './hooks/getQR';
import DashboardStats from './layout/dashboardStats';
import TableHeader from './layout/tableHeader';
import ClientTable from './layout/clientTable';
import QRmodal from './layout/QRmodal';
import EditModal from './layout/editModal';
import DeleteModal from './layout/deleteModal';
import ActivityModal from './layout/activityModal';
import MassDeleteModal from './layout/massDeleteModal';
import AdminFooter from './layout/adminFooter';
import fetchClientData from './hooks/fetchClientData'; 

function ClientDashboard() {
    
  
  //Clients object
  const [clients, setClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [qrCode, setQRCode] = useState(null);
  const [qrModal, setQRModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [qrCodeAddress, setQRCodeAddress] = useState(null);
  const [editClientID, setEditClientID] = useState(null);
  const [deleteClientID, setDeleteClientID] = useState(null);
  const [activityModal, setActivityModal] = useState(false);
  const [activityClient, setActivityClient] = useState(null);
  const [selectedClients, setSelectedClients] = useState(new Set());
  const [massDeleteModal, setMassDeleteModal] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  //CONFIG FOR FORM DATA
  const [formData, setFormData] = useState(CLIENTFORMCONFIG);
  useEffect(() => {
    fetchClientData(setLoading, setClients, setAllClients);
  }, []);


  //Trigger when search query changes
  useEffect (() => {    
    searchClientFilter(setClients, allClients, query);
  }, [query, allClients]);

  return (

    //Main CONTAINER
    <div className="dashboard-container">
      
      {/*Header CONTAINER*/}
      <div className="dashboard-header">
        
        <ClientDashboardHeader />
        
        <div className="header-actions">
          
          <LogoutButton />  

          <ReturnToActivities />

          <AddClientButton />

          <ToEulaagreement />

        </div>

      </div> {/*End of Header*/}
    
      {/*Main Content CONTAINER*/}
      <div className="dashboard-content">
        
        {/*Title CONTAINER*/}
        <div className="dashboard-title-section">
          <h2 className="dashboard-title"> Client Dashboard </h2> {/*title*/}
          
          <DashboardStats clients={clients} query={query} setQuery={setQuery} />
        </div> {/*end of title*/} 
            
        {/*table of clients
        LAYOUT DATA TABLE ELEMENT
        */} 
        <div className="data-table-container">
          
          <TableHeader />

          {selectedClients.size > 0 && (
            <div style={{ padding: '0.75rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <button
                className="action-button action-button-delete"
                onClick={() => setMassDeleteModal(true)}
              >
                Delete Selected ({selectedClients.size})
              </button>
            </div>
          )}

          {loading && <div className="spinner"></div>}
          
          {/*actual table container*/}   
          <div className="table-responsive">

            <ClientTable 
              clients={clients} 
              setQRModal={setQRModal} 
              handleQR={(ClientID) => getQR(ClientID, setQRCode)} 
              setQRCodeAddress={setQRCodeAddress}
              setEditModal={setEditModal}
              setEditClientID={setEditClientID}
              setFormData={setFormData}
              setDeleteModal={setDeleteModal}
              setDeleteClientID={setDeleteClientID}
              setActivityModal={setActivityModal}
              setActivityClient={setActivityClient}
              selectedClients={selectedClients}
              setSelectedClients={setSelectedClients}
            />

            {/*HANDLERS FOR MODALS*/}

            {qrModal && (
              <QRmodal 
                qrCode={qrCode} 
                qrCodeAddress={qrCodeAddress} 
                setQRModal={setQRModal} 
              />
            )}

            {editModal && (
              <EditModal 
                formData={formData}
                editClientID={editClientID}
                fetchClients={fetchClientData}
                setEditModal={setEditModal}
                setEditClientID={setEditClientID}
                setFormData={setFormData}
                setLoading={setLoading}
                setClients={setClients}
                setAllClients={setAllClients}
              />
            )}

            {/**
             * LAYOUT MODALS ELEMENT
             */}
            {deleteModal && (
                <DeleteModal
                    setDeleteModal={setDeleteModal}
                    setDeleteClientID={setDeleteClientID}
                    deleteClientID={deleteClientID}
                    setLoading={setLoading}
                    setClients={setClients}
                    setAllClients={setAllClients}
                />
            )}

            {activityModal && activityClient && (
                <ActivityModal
                    client={activityClient}
                    setActivityModal={setActivityModal}
                />
            )}

            {massDeleteModal && (
                <MassDeleteModal
                    selectedClients={selectedClients}
                    setMassDeleteModal={setMassDeleteModal}
                    setSelectedClients={setSelectedClients}
                    setLoading={setLoading}
                    setClients={setClients}
                    setAllClients={setAllClients}
                />
            )}

          </div>
        </div>
      </div>

        <AdminFooter />
    </div>
  );
};

export default ClientDashboard;