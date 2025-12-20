/**
 * 
 * custom hook to handle changes in the employee form
 */

export default function useChangeForm(formData, setFormData, e) {
    return function handleChange(e) {
      const {name, value, type, checked} = e.target;

      setFormData(prev => ({
        ...prev, 
       [name]: type === 'checkbox' ? checked:value
      }));
    };
  }