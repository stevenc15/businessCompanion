/**
 * addClientHeader.jsx - add client page header component
 */

import '../css/AddClient.css';

export default function AddClientHeader() {
    return (
        <div>
            <div className="employee-header">
                <div className="company-logo">
                    <div className="logo-placeholder">AL</div> {/*logo*/}
                </div>
                <h1 className="app-name">Activity Logger</h1> {/*title*/}
            </div>
        </div>
    );
}