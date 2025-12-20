/**
 * App.jsx - Root React component for the application.
 * 
 * Sets up application routing using react-router-dom.
 * Each route maps a url path to a specific React component.
 */

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import EmployeeForm from './Employee/EmployeeForm';
import ActivityDashboard from './Admin/ActivityDashboard';
import ClientDashboard from './Admin/ClientDashboard';
import AdminLogin from './Admin/AdminLogin';
import AddClient from './Admin/AddClient';
import EndUserAgreement from './EndUserAgreement';

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin/>} /> {/* Default landing point when accessed through the browser */}
        <Route path="/employee" element={<EmployeeForm/>} /> {/* Employee form accessible via QR code */}   
        <Route path="/activityDashboard" element={<ActivityDashboard/>} />
        <Route path="/clientDashboard" element={<ClientDashboard/>} />
        <Route path="/addClient" element={<AddClient/>} /> {/* Add client form for admin, will add to client dashboard*/}
        <Route path="/endUserAgreement" element={<EndUserAgreement/>} /> {/* End user agreement page */}
      </Routes>
    </Router>
  )
}

export default App;