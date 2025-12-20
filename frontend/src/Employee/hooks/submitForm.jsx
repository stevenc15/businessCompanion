/**
 * 
 * custom hook to submit form data to the backend
 */

import { FORMDEFAULT } from "../config/formDefault";

export default async function submitForm(e, formData, setFormData) {

    e.preventDefault();
    const res = await fetch('https://api.hm-services.online/employee/insert-activity', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message || 'Submitted!');
    setFormData(FORMDEFAULT);
  };