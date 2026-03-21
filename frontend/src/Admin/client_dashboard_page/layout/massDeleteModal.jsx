/**
 * massDeleteModal.jsx - confirmation modal for mass deletion of clients
 */
import '../css/ClientDashboard.css';
import massDeleteClients from '../hooks/massDeleteClients';

export default function MassDeleteModal({ selectedClients, setMassDeleteModal, setSelectedClients, setLoading, setClients, setAllClients }) {
    const count = selectedClients.size;

    return (
        <div className="option-container">
            <div>
                <p>Delete {count} selected client{count !== 1 ? 's' : ''}? This cannot be undone.</p>
                <button onClick={() => massDeleteClients(
                    Array.from(selectedClients),
                    setLoading,
                    setClients,
                    setAllClients,
                    setMassDeleteModal,
                    setSelectedClients
                )}>Confirm</button>
                <button onClick={() => setMassDeleteModal(false)}>Cancel</button>
            </div>
        </div>
    );
}
