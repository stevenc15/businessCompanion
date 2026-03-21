/**
 * sendLinksModal.jsx - lets the admin pick an employee and send them links
 * for all currently selected clients in one email.
 */

import { useState, useEffect } from 'react';
import { API_URL } from '../../../config/api';
import '../css/ClientDashboard.css';

export default function SendLinksModal({ selectedClients, clients, setSendLinksModal }) {
    const [employees, setEmployees] = useState([]);
    const [employeeEmail, setEmployeeEmail] = useState('');
    const [status, setStatus] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/admin/employees/getEmployees`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
                if (data.length > 0) setEmployeeEmail(data[0].email);
            })
            .catch(() => {});
    }, []);

    const selectedClientList = clients.filter(c => selectedClients.has(c.ClientId));

    async function handleSend() {
        if (!employeeEmail) return;
        setSending(true);
        setStatus('');
        const res = await fetch(`${API_URL}/admin/email/sendLinks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                employeeEmail,
                clientIds: Array.from(selectedClients),
            }),
        });
        const data = await res.json();
        setSending(false);
        if (res.ok) {
            setStatus('success');
        } else {
            setStatus(data.error || 'Failed to send');
        }
    }

    return (
        <div className="modal-overlay">
            <div className="form-card">
                <h2 className="form-title">Send Form Links</h2>

                <div className="form-group">
                    <label>Send to employee</label>
                    {employees.length > 0 ? (
                        <select
                            className="form-input"
                            value={employeeEmail}
                            onChange={e => setEmployeeEmail(e.target.value)}
                        >
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.email}>
                                    {emp.name ? `${emp.name} (${emp.email})` : emp.email}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                            No employees in whitelist. Add employees first from the Employee Management page.
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label>Links to be sent ({selectedClientList.length})</label>
                    <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {selectedClientList.map(c => (
                            <li key={c.ClientId}>{c.ClientName} — {c.Address}</li>
                        ))}
                    </ul>
                </div>

                {status === 'success' && (
                    <p style={{ color: '#38a169', marginBottom: '1rem' }}>Links sent successfully!</p>
                )}
                {status && status !== 'success' && (
                    <p style={{ color: '#e53e3e', marginBottom: '1rem' }}>{status}</p>
                )}

                <div className="form-actions">
                    <button
                        className="submit-button"
                        onClick={handleSend}
                        disabled={sending || employees.length === 0 || status === 'success'}
                    >
                        {sending ? 'Sending...' : 'Send Links'}
                    </button>
                    <button className="back-button" onClick={() => setSendLinksModal(false)}>
                        {status === 'success' ? 'Close' : 'Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
}
