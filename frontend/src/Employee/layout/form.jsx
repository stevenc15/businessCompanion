import '../css/EmployeeForm.css';

export default function Form({ formData, setFormData, changeForm, clientData }) {
    return (
        <div>
            {/*name*/}
            <div className="form-group">
                <label htmlFor="name">Employee Name</label>
                <input 
                    id="EmployeeName"
                    name="EmployeeName" 
                    placeholder="Enter your full name" 
                    onChange={(e) => changeForm(setFormData, e)}
                    value={formData.EmployeeName}
                    className="form-input"
                />
            </div>
        
            {/*Community*/}    
            <div className="form-group">
                <label htmlFor="task">Community</label>
                    <input 
                        id="Community"
                        name="Community" 
                        placeholder="Enter Community Name" 
                        readOnly
                        value={clientData?.Community || formData.Community}
                        className="form-input"
                        />
            </div>
        
            {/*Client Name*/}    
            <div className="form-group">
                <label htmlFor="task">ClientName</label>
                    <input 
                        id="ClientName"
                        name="ClientName" 
                        placeholder="Enter Client Name" 
                        readOnly
                        value={clientData?.ClientName || formData.ClientName}
                        className="form-input"
                    />
            </div>
        
            {/*Address*/}    
            <div className="form-group">
                <label htmlFor="task">Address</label>
                    <input 
                        id="Address"
                        name="Address" 
                        placeholder="Enter full Address" 
                        readOnly
                        value={clientData?.Address || formData.Address}
                        className="form-input"
                    />
            </div>
        
            {/*Service*/}    
            <div className="form-group">
                <label htmlFor="task">Service</label>
                    <input 
                        id="Service"
                        name="Service" 
                        placeholder="Describe Service" 
                        onChange={(e) => changeForm(setFormData, e)}
                        value={formData.Service}
                        className="form-input"
                    />
            </div>
        </div>
    );
};