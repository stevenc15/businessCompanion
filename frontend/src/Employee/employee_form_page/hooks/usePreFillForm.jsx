/**
 * usePreFillForm.jsx - custom hook used to pre-fill employee submission form 
 * with key client data
 * 
 * Key data means client name, community and address
 */

import {useEffect} from 'react';

export default function usePrefillForm(clientData, setFormData, formData) {
    
    console.log("usePrefillForm triggered with clientData:", clientData);
    
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

    console.log(formData);
}