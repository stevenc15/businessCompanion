import {useState} from 'react';
import {Link} from 'react-router-dom';
import './AddActivity.css';

//employee form for employees to log their activities
function AddActivity() {

  //define form data object
  const [formData, setFormData] = useState({
    EmployeeName: '', 
    Community: '', 
    ClientName: '', 
    Address: '',  
    Service: '',
    ReviewWeeklySchedule: false,
    CheckMailbox: false,
    ViewFrontOfTheHouse: false,
    TurnOnMainWater: false,
    BugsInsideOutsideFrontDoor: false,
    Ceilings: false,
    Floors: false,
    CloseClosets: false,
    TurnToiletsOnOff: false,
    GarageCeiling: false,
    GarageFloor: false,
    AnyGarageFridge: false,
    AcAirHandlerDrainLine: false,
    TurnOnOffWaterHeaterInElectricalPanel: false,
    TurnOnOffIceMachine: false,
    ThermostatSetTo78ForClose72ForOpening: false,
    ViewRearOfTheHouse: false,
  });

  
  //function to change form data
  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;

    setFormData((prev) => ({
       ...formData, 
       [name]: type === 'checkbox' ? checked:value
      })
    );
  };

  //log submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://businesscompanion.onrender.com/admin/addActivity', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    const data = await res.json();
    alert(data.message || 'Submitted!');
    setFormData({
      EmployeeName: '', 
      Community: '', 
      ClientName: '', 
      Address: '',  
      Service: '',
      ReviewWeeklySchedule: false,
      CheckMailbox: false,
      ViewFrontOfTheHouse: false,
      TurnOnMainWater: false,
      BugsInsideOutsideFrontDoor: false,
      Ceilings: false,
      Floors: false,
      CloseClosets: false,
      TurnToiletsOnOff: false,
      GarageCeiling: false,
      GarageFloor: false,
      AnyGarageFridge: false,
      AcAirHandlerDrainLine: false,
      TurnOnOffWaterHeaterInElectricalPanel: false,
      TurnOnOffIceMachine: false,
      ThermostatSetTo78ForClose72ForOpening: false,
      ViewRearOfTheHouse: false,
    });
  };

  return (
    //Main CONTAINER
    <div className="employee-container">

      {/*header CONTAINER*/}
      <div className="employee-header">
        <div className="company-logo">
          <div className="logo-placeholder">AL</div> {/*logo*/}
        </div>
        <h1 className="app-name">Activity Logger</h1> {/*title*/}
      </div>

      {/*main content CONTAINER*/}
      <div className="employee-content">
        
        {/*logging form*/}
        <div className="form-card">

          {/*heading*/}
          <h2 className="form-title">Activity Log</h2>

          {/*logging form*/} 
          <form className="activity-form" onSubmit={handleSubmit}>
            
            {/*name*/}
            <div className="form-group">
              <label htmlFor="name">Employee Name</label>
              <input 
                id="EmployeeName"
                name="EmployeeName" 
                placeholder="Enter your full name" 
                onChange={handleChange}
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
                onChange={handleChange}
                value={formData.Community}
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
                onChange={handleChange}
                value={formData.ClientName}
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
                onChange={handleChange}
                value={formData.Address}
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
                onChange={handleChange}
                value={formData.Service}
                className="form-input"
              />
            </div>

            <div className="form-group checklist-group">
              <label>Checklist</label>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ReviewWeeklySchedule"
                  name="ReviewWeeklySchedule"
                  checked={formData.ReviewWeeklySchedule}
                  onChange={handleChange}
                />
                <label htmlFor="ReviewWeeklySchedule">Review Weekly Schedule</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="CheckMailbox"
                  name="CheckMailbox"
                  checked={formData.CheckMailbox}
                  onChange={handleChange}
                />
                <label htmlFor="CheckMailbox">Check Mailbox</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ViewFrontOfTheHouse"
                  name="ViewFrontOfTheHouse"
                  checked={formData.ViewFrontOfTheHouse}
                  onChange={handleChange}
                />
                <label htmlFor="ViewFrontOfTheHouse">View Front Of The House</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="TurnOnMainWater"
                  name="TurnOnMainWater"
                  checked={formData.TurnOnMainWater}
                  onChange={handleChange}
                />
                <label htmlFor="TurnOnMainWater">Turn On Main Water</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="BugsInsideOutsideFrontDoor"
                  name="BugsInsideOutsideFrontDoor"
                  checked={formData.BugsInsideOutsideFrontDoor}
                  onChange={handleChange}
                />
                <label htmlFor="BugsInsideOutsideFrontDoor">Bugs Inside/Outside Front Door</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="Ceilings"
                  name="Ceilings"
                  checked={formData.Ceilings}
                  onChange={handleChange}
                />
                <label htmlFor="Ceilings">Ceilings</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="Floors"
                  name="Floors"
                  checked={formData.Floors}
                  onChange={handleChange}
                />
                <label htmlFor="Floors">Floors</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="CloseClosets"
                  name="CloseClosets"
                  checked={formData.CloseClosets}
                  onChange={handleChange}
                />
                <label htmlFor="CloseClosets">Close Closets</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="TurnToiletsOnOff"
                  name="TurnToiletsOnOff"
                  checked={formData.TurnToiletsOnOff}
                  onChange={handleChange}
                />
                <label htmlFor="TurnToiletsOnOff">Turn Toilets On/Off</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="GarageCeiling"
                  name="GarageCeiling"
                  checked={formData.GarageCeiling}
                  onChange={handleChange}
                />
                <label htmlFor="GarageCeiling">Garage Ceiling</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="GarageFloor"
                  name="GarageFloor"
                  checked={formData.GarageFloor}
                  onChange={handleChange}
                />
                <label htmlFor="GarageFloor">Garage Floor</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="AnyGarageFridge"
                  name="AnyGarageFridge"
                  checked={formData.AnyGarageFridge}
                  onChange={handleChange}
                />
                <label htmlFor="AnyGarageFridge">Any Garage Fridge</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="AcAirHandlerDrainLine"
                  name="AcAirHandlerDrainLine"
                  checked={formData.AcAirHandlerDrainLine}
                  onChange={handleChange}
                />
                <label htmlFor="AcAirHandlerDrainLine">AC Air Handler Drain Line</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="TurnOnOffWaterHeaterInElectricalPanel"
                  name="TurnOnOffWaterHeaterInElectricalPanel"
                  checked={formData.TurnOnOffWaterHeaterInElectricalPanel}
                  onChange={handleChange}
                />
                <label htmlFor="TurnOnOffWaterHeaterInElectricalPanel">Turn On/Off Water Heater In Electrical Panel</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="TurnOnOffIceMachine"
                  name="TurnOnOffIceMachine"
                  checked={formData.TurnOnOffIceMachine}
                  onChange={handleChange}
                />
                <label htmlFor="TurnOnOffIceMachine">Turn On/Off Ice Machine</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ThermostatSetTo78ForClose72ForOpening"
                  name="ThermostatSetTo78ForClose72ForOpening"
                  checked={formData.ThermostatSetTo78ForClose72ForOpening}
                  onChange={handleChange}
                />
                <label htmlFor="ThermostatSetTo78ForClose72ForOpening">Thermostat Set To 78 For Close 72 For Opening</label>
              </div>

              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="ViewRearOfTheHouse"
                  name="ViewRearOfTheHouse"
                  checked={formData.ViewRearOfTheHouse}
                  onChange={handleChange}
                />
                <label htmlFor="ViewRearOfTheHouse">View Rear Of The House</label>
              </div>

            </div>

            {/*other options at the end*/} 
            <div className="form-actions">
              {/*submit button*/} 
              <button type="submit" className="submit-button">
                Submit Activity
              </button>
              <button 
                className="back-button"
                type="button"
                onClick={() => {
                  navigate('/activityDashboard');
                }}
              >
                Go to Activity Dashboard
              </button>
            </div>

          </form> 

        </div> {/*end of form*/}

      </div>
          
      {/*footer*/}
      <div className="employee-footer">
        <p>© 2025 Company Name. All rights reserved.</p>
        <p className="version-info">Version 1.0.2</p>
      </div>

    </div>
  );
};
    
export default AddActivity;