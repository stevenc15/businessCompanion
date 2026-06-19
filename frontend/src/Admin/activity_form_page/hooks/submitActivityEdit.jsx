/**
 * submitActivityEdit.jsx - hook to submit edits to an activity record
 */

import { API_URL } from "../../../config/api";

export default async function submitActivityEdit(e, ActivityId, formData, navigate) {
    e.preventDefault();

    const res = await fetch(`${API_URL}/admin/activities/editActivity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ActivityId }),
        credentials: 'include',
    });

    const data = await res.json();

    if (res.ok) {
        alert(data.message || 'Activity updated!');
        navigate('/activityDatabase');
    } else {
        alert(data.error || 'Failed to update activity');
    }
}
