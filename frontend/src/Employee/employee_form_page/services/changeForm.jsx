/**
 * changeForm.jsx - custom function used to change values of the form 
 * in preparation for submission of form
 */

export default function changeForm(setFormData, e) {
  
  console.log("changeForm triggered");
  
  const {name, value, type, checked} = e.target;

  console.log(`Changing form field: ${name}, New Value: ${type === 'checkbox' ? checked:value}`);

  setFormData(prev => ({
    ...prev, 
    [name]: type === 'checkbox' ? checked:value
  }));
}