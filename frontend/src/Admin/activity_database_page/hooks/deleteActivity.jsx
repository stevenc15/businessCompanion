/**
 * deleteActivity.jsx - hook to delete an activity from the activity database page
 */
import { API_URL } from "../../../config/api";
import fetchActivityData from "./fetchActivityData";

export default async function deleteActivity(deleteActivityId, setLoading, setActivities, setAllActivities, setDeleteModal) {
    const res = await fetch(`${API_URL}/admin/activities/deleteActivity`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ActivityId: deleteActivityId}),
      credentials: 'include',
    });

    if (res.ok){
      fetchActivityData(setLoading, setActivities, setAllActivities)
      setDeleteModal(false)
    }else {
      console.error('Failed to delete activity');
    }
}
