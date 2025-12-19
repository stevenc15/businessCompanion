/**
 * employeeHeader.jsx - A React component that renders a header for the employee page.
 */

import './css/EmployeeForm.css';

export default function EmployeeHeader() {

    return (
        <div className="employee-header">
            <div className="company-logo">
                <div className="logo-placeholder">AL</div> {/*logo*/}
            </div>
            <h1 className="app-name">Activity Logger</h1> {/*title*/}
        </div>
    );
}