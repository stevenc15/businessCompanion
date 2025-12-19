/**
 * 
 * custom hook to handle changes in the employee form
 */

export default function useChangeForm(formData, setFormData, e) {
    const {name, value, type, checked} = e.target;

    setFormData(() => ({
       ...formData, 
       [name]: type === 'checkbox' ? checked:value
      })
    );
  };