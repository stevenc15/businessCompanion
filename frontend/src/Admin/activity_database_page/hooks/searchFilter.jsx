/**
 * searchFilter.jsx - hook for the activity database page's search feature
 */

export default function searchActivityFilter(setActivities, allActivities, query) {
    const filtered = allActivities.filter((activity) =>
      Object.values(activity).some((value) =>
        value?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setActivities(filtered);
}
