/**
 * fetchActivity.jsx - hook for fetching a single activity record for the activity form page
 */

import { API_URL } from '../../../config/api';

export default async function fetchActivity(ActivityId, setFormData, setError, setLoading) {
    setLoading(true);
    try {
        const res = await fetch(`${API_URL}/admin/activities/getActivity?ActivityId=${ActivityId}`, {
            credentials: 'include',
        });
        if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`);
        const data = await res.json();
        setFormData(data);
    } catch (error) {
        console.error('Failed to get activity data', error);
        setError('Failed to load activity. It may have been deleted.');
    } finally {
        setLoading(false);
    }
}
