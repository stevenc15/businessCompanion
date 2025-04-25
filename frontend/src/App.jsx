import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import EmployeeForm from './Employee/EmployeeForm';
import AdminDashboard from './Admin/AdminDashboard';
import LandingPage from './LandingPage';
import AdminLogin from './Admin/AdminLogin';

function App() {
  return(
    <Router>
      <Routes>
        {/*Designate Page Structure and page links for navigation*/}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/employee" element={<EmployeeForm/>} />
        <Route path="/adminLogin" element={<AdminLogin/>} />
        <Route path="/admin" element={<AdminDashboard/>} />
      </Routes>
    </Router>
  )
}

export default App;