/**
 * 
 * custom hook to pre-fill client data into employee form
 */

import {useEffect} from 'react';

export default function usePrefillForm(clientData, setFormData) {

    //populate form data with client data
    useEffect (() => {
        if (clientData) {
            setFormData((prev) => ({
                ...prev, 
                Community: clientData.Community || '',
                ClientName: clientData.ClientName || '',
                Address: clientData.Address || '',
            }));
        }
    }, [clientData, setFormData]);
}