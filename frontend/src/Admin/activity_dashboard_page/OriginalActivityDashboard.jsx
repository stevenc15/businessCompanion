/**
 * ActivityDashboard Component
 * 
 * This component represents the dashboard for managing activities.
 * It includes a header with company logo, app name, and actions like logout, go to client dashboard, and go to EULA agreement.
 * The main content section displays a title and an iframe to embed a Google Sheet for managing activities.
 * Additionally, there is a button to export the data to Excel.
 * The footer contains copyright information and version details.
 */

import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './css/ActivityDashboard.css';

function ActivityDashboard () {

    const navigate = useNavigate();

    // HOOKS MAKE get sheet url hook 
    const [sheetUrl, setSheetUrl] = useState(null);
    useEffect(()=>{
        fetch('https://api.hm-services.online/admin/get-sheet', {
            credentials:'include'
        })
            .then(res=>res.json())
            .then(data=>setSheetUrl(data.url));
    }, []);

    return (
      
    //Main CONTAINER
    <div className="dashboard-container">
      
        {/*Header CONTAINER*/}
        <div className="dashboard-header">
      
            {/*
            COMMON CREATE CUSTOM ELEMENT
            Header*/}
            <div className="company-logo">
                <div className="logo-placeholder">AL</div> {/*Logo*/}
            </div>
      
            <h1 className="app-name">Activity Logger</h1> {/*Title*/}
      
            {/*Clickable elements of header*/}
            <div className="header-actions">
        

                {/*
                COMMON MAKE LOGOUT ELEMENT 
                Logout*/}
                <button 
                    className="logout-button"
                    onClick={() => {
                    localStorage.removeItem('isAdmin');
                    navigate('/');
                    }}
                >
                    Logout
                </button>

                {/*
                COMMON MAKE GO BACK ELEMENT
                To Client Dashboard*/}
                <button 
                    className="go-back-button"
                    
                    onClick={() => {
                        navigate('/clientDashboard');
                    }}
                >
                    Go to Client Dashboard
                </button>

                {/*
                COMMON MAKE EULA ELEMENT BUTTON
                To EULA Agreement*/}
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
      
            {/*
            LAYOUT TITLE
            Title CONTAINER*/}
            <div className="dashboard-title-section">
                <h2 className="dashboard-title">Manage Activities</h2> {/*title*/}          
            </div> {/*end of title*/}            
            
            {/*
            LAYOUT MAKE FILE 
            Google Sheet Iframe*/}
            <iframe
                src={sheetUrl}
                width="100%"
                height="600"
                style={{ border: 'none' }}
                title="Google Sheet"
            />
            
            <a href="https://api.hm-services.online/admin/get-export-sheet" target="_blank" rel="noopener noreferrer">
                <button style={{ marginTop: '20px', marginBottom: '20px', padding: '10px 20px' }}>
                    Export to Excel
                </button>
            </a>

            {/*
            COMMON MAKE  
            footer*/} 
            <div className="dashboard-footer">
                <p>© 2025 Company Name. All rights reserved.</p>
                <p className="version-info">Version 1.0.2</p>
            </div>

        </div>
    
    </div>
    );

};

export default ActivityDashboard;