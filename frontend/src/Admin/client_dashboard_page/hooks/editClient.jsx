/**
 * editClient.jsx - hook for editing client data from client dashboard page
 */
import { API_URL } from "../../../config/api";

export default async function editClient(e, formData, editClientID, fetchClients, setEditModal, setEditClientID, setLoading, setClients, setAllClients) {
    e.preventDefault();

    console.log(formData);
    
    const updatedData = {
      ...formData,      // includes ClientName, Address, Community
      ClientId: editClientID, // add your editClientId here
    };
    console.log(updatedData)
    const res = await fetch(`${API_URL}/admin/clients/editClient`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedData),
      credentials: 'include',
    });

    if (res.ok){
      await fetchClients(setLoading, setClients, setAllClients);

      const data = await res.json();
      alert(data.message || 'Submitted!');
      setEditModal(false);
      setEditClientID(null);
    
    }else {
      console.error('Failed to edit client');
    }
}