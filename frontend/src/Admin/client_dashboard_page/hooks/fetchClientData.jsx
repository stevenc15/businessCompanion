/**
 * fetchClientData.jsx - hook for fetching client data for dashboard
 */

import { useEffect } from 'react';
import { API_URL } from '../../../config/api';

export default async function fetchClientData(setLoading, setClients, setAllClients) {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}/admin/clients/getClients`, {
            credentials: 'include',
        });
        const data = await res.json();
        if (!data) console.log('no Clients available');
        setClients(data);
        setAllClients(data);
        setLoading(false);
    } catch (error) {
        console.error('Failed to get client data', error);
    }
}