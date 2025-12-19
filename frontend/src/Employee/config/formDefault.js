import { CHECKLISTITEMS } from "./checklistConfig";

export const FORMDEFAULT = {
    EmployeeName: '', 
    Community: '',
    ClientName: '', 
    Address: '',  
    Service: '',

    ...Object.fromEntries(
        CHECKLISTITEMS.map(item => [item.id, false])
    )
};