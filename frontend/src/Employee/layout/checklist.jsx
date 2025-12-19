/**
 * checklist.jsx - checklist component for employee form 
 * 
 * This component renders a checklist for an employee form. Each item in the 
 * checklist is represented by a checkbox input element, and the state of each 
 * checkbox is managed by the `formData` object. 
 * The `handleChange` function is used to update the state when a checkbox 
 * is checked or unchecked.
 */

import './css/EmployeeForm.css';
import Checkboxitem from '../common/checkboxItem';


export default function CheckList({formData, handleChange, checklistItems}) {

    return (

        <div className="form-group checklist-group">
            <label>Checklist</label>
            {checklistItems.map(item => (
                <Checkboxitem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    checked={formData[item.id]}
                    onChange={(e) => handleChange(e, formData)}
                />  
            ))}
              

        </div>
    );
}