/**
 * submitClientForm.jsx - hook to handle submission of add client form 
 */

import { CLIENTFORMCONFIG } from "../config/clientForm";
import { API_URL } from "../../../config/api"; 

export default async function submitClientForm(e, formData, setFormData) {
  console.log('event:', e);
  console.log('formData:', formData);
  e.preventDefault();

    const res = await fetch(`${API_URL}/admin/clients/addClient`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    const data = await res.json();
    console.log('Response data:', data);
    
    alert(data.message || 'Submitted!');
    setFormData(CLIENTFORMCONFIG); 
} 
/**
 * submitClientForm.jsx - hook to handle submission of add client form 
 */

import { CLIENTFORMCONFIG } from "../config/clientForm";
import { API_URL } from "../../../config/api"; 

export default async function submitClientForm(e, formData, setFormData) {
  console.log('event:', e);
  console.log('formData:', formData);
  e.preventDefault();

    const res = await fetch(`${API_URL}/admin/addClient`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    const data = await res.json();
    console.log('Response data:', data);
    
    alert(data.message || 'Submitted!');
    setFormData(CLIENTFORMCONFIG); 
} 