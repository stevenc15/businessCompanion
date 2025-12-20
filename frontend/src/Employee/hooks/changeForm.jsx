/**
 * 
 * custom hook to handle changes in the employee form
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