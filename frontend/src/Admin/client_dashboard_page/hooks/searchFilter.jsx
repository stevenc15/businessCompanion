/**
 * searchFilter.jsx - hook to handle search functionality for client dashboard
 */

export default function searchClientFilter(setClients, allClients, query) {
    const filtered = allClients.filter((client) => 
      Object.values(client).some((value) => 
        value?.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setClients(filtered);
}