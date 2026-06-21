/**
 * deleteActivityModal.jsx - layout component for delete popup or modal in which
 * confirmation of choice of deletion is requested
 */

import '../css/ActivityDatabase.css';
import deleteActivity from '../hooks/deleteActivity';

export default function DeleteActivityModal({ setDeleteModal, setDeleteActivityId, deleteActivityId, setLoading, setActivities, setAllActivities }) {
    return (
        <div className="option-container">
                <div>
                  <p>Are you sure you want to delete this activity?</p>
                  <button onClick={() => deleteActivity(deleteActivityId, setLoading, setActivities, setAllActivities, setDeleteModal)}>Confirm</button>
                  <button onClick={() => {
                  setDeleteModal(false);
                  setDeleteActivityId(null);
                  }}>
                    Cancel
                  </button>
                </div>
              </div>
    )
}
