/**
 * toggleActivityStatus.jsx - hook to flip an activity's processed/pending status
 * (placeholder for the eventual QuickBooks integration)
 */
import { API_URL } from "../../../config/api";
import fetchActivityData from "./fetchActivityData";

export default async function toggleActivityStatus(ActivityId, setLoading, setActivities, setAllActivities) {
    const res = await fetch(`${API_URL}/admin/activities/toggleStatus`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ActivityId}),
      credentials: 'include',
    });

    if (res.ok){
      fetchActivityData(setLoading, setActivities, setAllActivities)
    }else {
      console.error('Failed to update activity status');
    }
}
