import React, {useState, useEffect, useCallback} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './ActivityDashboard.css';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';



function ActivityDashboard () {

    const navigate = useNavigate();

    const [excelData, setExcelData] = useState([]);
    
    const [showTable, setShowTable] = useState(false);

    //function importExcel
    const importExcel = async (event) => {
        
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('excelFile', file);

        try {
          await fetch('http://localhost:5001/api/upload-excel', {
            method: 'POST',
            body: formData,
          });
          alert('File successfully uploaded!');
        } catch(err){
          console.error(err);
          alert('Upload failed');
        }
    };

    //function downloadExcel
    const downloadExcel = () => {
        window.location.href = 'http://localhost:5001/api/download-excel';
    };

    //function viewExcel
    const viewExcel = async () => {
        
      try{
        const res = await fetch('http://localhost:5001/api/view-excel');
        const blob = await res.blob();
        const data = await blob.arrayBuffer();
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        setExcelData(jsonData);
        setShowTable(true);
      }
      catch(err){
        console.error(err);
        alert('Failed to load excel file');
      }
    };

    const renderCell = (value) => {
      if (value == true) return 'YES';
      if (value == false) return '';
      return value;
    };

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
                <h2 className="dashboard-title">Manage Excel Activities</h2> {/*title*/}          
            </div> {/*end of title*/} 

            {/*Buttons*/}   
            <div className="excel-actions">
              <label className="import-label">
                Import Excel
                <input type="file" accept=".xlsx, .xls" onChange={importExcel} style={{ marginBottom: '10px' }} />
              </label>
              <button onClick={viewExcel}>{showTable ? 'Hide' : 'View'} Excel</button>
              <button onClick={downloadExcel}>Export Excel</button>              
            </div>

            {/* Conditional Table Display */}
            {showTable && excelData.length > 0 && (
              <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                <table className="excel-table">
                  <thead>
                    <tr>
                      {Object.keys(excelData[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {excelData.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((cell, j) => (
                          <td key={j}>{renderCell(value)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>      
              </div>
        )};

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