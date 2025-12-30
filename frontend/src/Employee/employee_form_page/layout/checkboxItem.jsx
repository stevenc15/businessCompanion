/**
 * checkboxItem.jsx - component used to display checkbox item next to job description option in activity log form
 * 
 * This component will display a checkbox item for the employee to check off. 
 * It is related to the job description option from the employee form.
 */

import '../css/EmployeeForm.css';

export default function Checkboxitem({id, label, checked, onChange}) {
    
    return (
        <div className="checkbox-item">
            <input
                type="checkbox"
                id={id}
                name={id}
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}