import React, {useState, useEffect, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './ActivityDashboard.css';

function ActivityDashboard () {

    const navigate = useNavigate();
    
    const sheetId = '1C1X6BUa51t1XhKwQcDPXg4Mj5wYHatybBqkY_0JbrFs';
    const downloadUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=xlsx`;


    return (
      
    //Main CONTAINER
    <div className="dashboard-container">
      
        {/*Header CONTAINER*/}
        <div className="dashboard-header">
      
            <div className="company-logo">
                <div className="logo-placeholder">AL</div> {/*Logo*/}
            </div>
      
            <h1 className="app-name">Activity Logger</h1> {/*Title*/}
      
            {/*Clickable elements of header*/}
            <div className="header-actions">
        
                {/*Logout*/}
                <button 
                    className="logout-button"
                    onClick={() => {
                    localStorage.removeItem('isAdmin');
                    navigate('/');
                    }}
                >
                    Logout
                </button>

                {/*To Client Dashboard*/}
                <button 
                    className="go-back-button"
                    
                    onClick={() => {
                        navigate('/clientDashboard');
                    }}
                >
                    Go to Client Dashboard
                </button>

                {/*To EULA Agreement*/}
                <button 
                    className="go-back-button"
                    onClick={() => {
                        navigate('/endUserAgreement');
                    }}
                >
                    Go to EULA Agreement
                </button>
            </div>

        </div> {/*End of Header*/}

  
        {/*Main Content CONTAINER*/}
        <div className="dashboard-content">
      
            {/*Title CONTAINER*/}
            <div className="dashboard-title-section">
                <h2 className="dashboard-title">Manage Activities</h2> {/*title*/}          
            </div> {/*end of title*/}            

            <iframe
                src="https://docs.google.com/spreadsheets/d/1C1X6BUa51t1XhKwQcDPXg4Mj5wYHatybBqkY_0JbrFs/edit?gid=0#gid=0"
                width="100%"
                height="600"
                style={{ border: 'none' }}
                title="Google Sheet"
            />
            
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <button className="m-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Export to Excel
                </button>
            </a>

        {/*footer*/} 
        <div className="dashboard-footer">
            <p>© 2025 Company Name. All rights reserved.</p>
            <p className="version-info">Version 1.0.2</p>
        </div>

        </div>
    
    </div>
    );

};

export default ActivityDashboard;