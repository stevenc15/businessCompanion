/**
 * submitForm.jsx - custom function to submit form
 * 
 * Calls the insert-activity endpoint from the backend
 */

import { FORMDEFAULT } from "../config/formDefault";
import { API_URL} from "../../../config/api";

export default async function submitForm(e, formData, setFormData) {

    e.preventDefault();
    console.log("submitForm triggered");
    console.log("Submitting Form Data:", formData);
    const res = await fetch(`${API_URL}/employee/insert-activity`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    alert(data.message || 'Submitted!');
    setFormData(FORMDEFAULT);
  };