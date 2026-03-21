/**
 * massDeleteClients.jsx - hook to delete multiple clients at once
 */
import { API_URL } from "../../../config/api";
import fetchClientData from "./fetchClientData";

export default async function massDeleteClients(clientIds, setLoading, setClients, setAllClients, setMassDeleteModal, setSelectedClients) {
    const res = await fetch(`${API_URL}/admin/clients/bulkDeleteClients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientIds }),
        credentials: 'include',
    });

    if (res.ok) {
        fetchClientData(setLoading, setClients, setAllClients);
        setSelectedClients(new Set());
        setMassDeleteModal(false);
    } else {
        console.error('Failed to bulk delete clients');
    }
}
