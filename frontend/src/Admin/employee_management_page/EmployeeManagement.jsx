/**
 * EmployeeManagement.jsx - Admin page to manage the employee email whitelist.
 * Admin can add and remove employee emails that are allowed to submit forms.
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/api';
import '../client_dashboard_page/css/ClientDashboard.css';

export default function EmployeeManagement() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function fetchEmployees() {
        const res = await fetch(`${API_URL}/admin/employees/getEmployees`, { credentials: 'include' });
        if (res.ok) {
            const data = await res.json();
            setEmployees(data);
        }
    }

    useEffect(() => { fetchEmployees(); }, []);

    async function handleAdd(e) {
        e.preventDefault();
        setError('');
        if (!email.trim()) return;
        setLoading(true);
        const res = await fetch(`${API_URL}/admin/employees/addEmployee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ email: email.trim(), name: name.trim() || undefined }),
        });
        const data = await res.json();
        if (res.ok) {
            setEmail('');
            setName('');
            fetchEmployees();
        } else {
            setError(data.error || 'Failed to add employee');
        }
        setLoading(false);
    }

    async function handleDelete(id) {
        const res = await fetch(`${API_URL}/admin/employees/deleteEmployee`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id }),
        });
        if (res.ok) fetchEmployees();
    }

    return (
        <div className="dashboard-container">

            <div className="dashboard-header">
                <div className="company-logo">
                    <div className="logo-placeholder">HM</div>
                    <span className="app-name">Employee Whitelist</span>
                </div>
                <div className="header-actions">
                    <button className="go-back-button" onClick={() => navigate('/clientDashboard')}>
                        Back to Clients
                    </button>
                </div>
            </div>

            <div className="dashboard-content">
                <h2 className="dashboard-title">Manage Authorized Employees</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Only employees whose Google account email is listed here can submit activity forms.
                </p>

                {/* Add Employee Form */}
                <div className="data-table-container" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', fontWeight: 500 }}>Add Employee</h3>
                    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ marginBottom: 0, flex: '1 1 220px' }}>
                            <label>Email *</label>
                            <input
                                className="form-input"
                                type="email"
                                placeholder="employee@gmail.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0, flex: '1 1 180px' }}>
                            <label>Name (optional)</label>
                            <input
                                className="form-input"
                                type="text"
                                placeholder="Full name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="submit-button" disabled={loading} style={{ height: '46px', marginLeft: 0 }}>
                            {loading ? 'Adding...' : 'Add Employee'}
                        </button>
                    </form>
                    {error && <p style={{ color: '#e53e3e', marginTop: '0.75rem', fontSize: '0.9rem' }}>{error}</p>}
                </div>

                {/* Employee Table */}
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? employees.map(emp => (
                                <tr key={emp.id}>
                                    <td>{emp.email}</td>
                                    <td>{emp.name || '—'}</td>
                                    <td>{new Date(emp.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button
                                            className="action-button action-button-delete"
                                            onClick={() => handleDelete(emp.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="no-data">No employees added yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
