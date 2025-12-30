/**
 * deleteClient.jsx - hook to delete client from client dashboard page
 */
import { API_URL } from "../../../config/api";
import fetchClientData from "./fetchClientData";

export default async function deleteClient(deleteClientID, setLoading, setClients, setAllClients, setDeleteModal) {
    const res = await fetch(`${API_URL}/admin/deleteClient`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ClientId: deleteClientID}),
      credentials: 'include',
    });

    if (res.ok){
      fetchClientData(setLoading, setClients, setAllClients)
      setDeleteModal(false)
      console.log('client data deleted')
    }else {
      console.error('Failed to delete client');
    }
}