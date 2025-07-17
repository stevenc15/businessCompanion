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
    const importExcel = (event) => {
        
        const file = event.target.files[0];

        if (!file) return;


        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary'});
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: '' });
            setExcelData(data);
            setShowTable(false);
        };
        reader.readAsBinaryString(file);

    };

    //function downloadExcel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Activities');

        const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
        const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
        saveAs(blob, 'activity_data.xlsx');
    };

    //function viewExcel
    const viewExcel = () => {
        setShowTable((prev) => !prev);
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
                
            <div >
          <button onClick={viewExcel}>{showTable ? 'Hide' : 'View'} Excel</button>
          <button onClick={downloadExcel}>Export Excel</button>
          <label >
            Import Excel
            <input type="file" accept=".xlsx, .xls" onChange={importExcel} hidden />
          </label>
        </div>

        {/* Conditional Table Display */}
        {showTable && excelData.length > 0 && (
          <div className="excel-table">
            <table>
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
                      <td key={j}>{cell}</td>
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