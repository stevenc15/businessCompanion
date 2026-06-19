/**
 * fetchActivityData.jsx - hook for fetching activity data for the activity database page
 */

import { API_URL } from '../../../config/api';

export default async function fetchActivityData(setLoading, setActivities, setAllActivities) {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}/admin/activities/getActivities`, {
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`Failed to fetch activities: ${res.status}`);
        const data = await res.json();
        setActivities(data);
        setAllActivities(data);
    } catch (error) {
        console.error('Failed to get activity data', error);
    } finally {
        setLoading(false);
    }
}
