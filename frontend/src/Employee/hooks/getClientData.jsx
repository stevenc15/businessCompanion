/**
 * 
 * custom hook to fetch client data based on ClientId
 */

import {useState, useEffect} from 'react';

export default function useGetClientData(ClientId) {
    const [clientData, setClientData] = useState(null);

    useEffect (() => {
    if (ClientId) {
      fetch(`https://api.hm-services.online/employee/getSingleClient?ClientId=${ClientId}`)
        .then(res => res.json())
        .then(data => setClientData(data))
        .catch(err => console.error("Error fetching the client: ", err));
    }
    }, [ClientId]);

    return clientData;
}