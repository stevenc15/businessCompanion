import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import EmployeeForm from './Employee/EmployeeForm';
import ActivityDashboard from './Admin/ActivityDashboard';
import ClientDashboard from './Admin/ClientDashboard';
import AdminLogin from './Admin/AdminLogin';
import AddClient from './Admin/AddClient';
import AddActivity from './Admin/AddActivity';


function App() {
  return(
    <Router>
      <Routes>
        {/*Designate Page Structure and page links for navigation*/}
        {/*<Route path="/" element={<LandingPage/>} />*/}
        <Route path="/" element={<AdminLogin/>} />
        <Route path="/employee" element={<EmployeeForm/>} />     
        <Route path="/activityDashboard" element={<ActivityDashboard/>} />
        <Route path="/clientDashboard" element={<ClientDashboard/>} />
        <Route path="/addClient" element={<AddClient/>} />
        <Route path="/addActivity" element={<AddActivity/>} />
      </Routes>
    </Router>
  )
}

export default App;