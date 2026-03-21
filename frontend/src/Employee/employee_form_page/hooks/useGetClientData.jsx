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
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ClientId) {
      fetch(`${API_URL}/employee/getSingleClient?ClientId=${ClientId}`)
        .then(res => {
          if (!res.ok) throw new Error(`Failed to fetch client: ${res.status}`);
          return res.json();
        })
        .then(data => setClientData(data))
        .catch(err => {
          console.error("Error fetching the client: ", err);
          setError('Could not load client information. Please fill in the form manually.');
        });
    }
  }, [ClientId]);

  return [clientData, error];
}