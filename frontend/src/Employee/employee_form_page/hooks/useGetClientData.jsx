/**
 * useGetClientData.jsx - custom hook element intended to fetch client information based
 * on client ID from QR code
 * 
 * Depends on client id being available from QR code
 * Will return client data
 */

import {useState, useEffect} from 'react';
import { API_URL } from '../../../config/api';

export default function useGetClientData(ClientId) {
  console.log("useGetClientData triggered with ClientId:", ClientId);
  
  const [clientData, setClientData] = useState(null);

    useEffect (() => {
    if (ClientId) {
      fetch(`${API_URL}/employee/getSingleClient?ClientId=${ClientId}`)
        .then(res => res.json())
        .then(data => setClientData(data))
        .catch(err => console.error("Error fetching the client: ", err));
    }
    }, [ClientId]);
    
    console.log("Fetched Client Data:", clientData);

    return clientData;
}