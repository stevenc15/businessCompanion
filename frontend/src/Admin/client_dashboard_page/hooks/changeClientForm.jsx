/**
 * changeClientForm.jsx - hook to change add client form data
 */

export default function changeClientForm(e, setFormData, formData) {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};