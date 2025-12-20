/**
 * 
 * custom hook to fetch client data based on ClientId
 */

import {useState, useEffect} from 'react';

export default function useGetClientData(ClientId) {
  console.log("useGetClientData triggered with ClientId:", ClientId);
  const [clientData, setClientData] = useState(null);
  const clientId = ClientId; // Ensure ClientId is correctly referenced
    useEffect (() => {
    if (clientId) {
      fetch(`https://api.hm-services.online/employee/getSingleClient?ClientId=${clientId}`)
        .then(res => res.json())
        .then(data => setClientData(data))
        .catch(err => console.error("Error fetching the client: ", err));
    }
    }, [clientId]);
    
    console.log("Fetched Client Data:", clientData);

    return clientData;
}