/**
 * fetchClientData.jsx - hook for fetching client data for dashboard
 */

import { API_URL } from '../../../config/api';

export default async function fetchClientData(setLoading, setClients, setAllClients) {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}/admin/clients/getClients`, {
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`Failed to fetch clients: ${res.status}`);
        const data = await res.json();
        setClients(data);
        setAllClients(data);
    } catch (error) {
        console.error('Failed to get client data', error);
    } finally {
        setLoading(false);
    }
}