/**
 * useEmployeeAuth.jsx - checks whether the current user has an active employee session
 */

import { useState, useEffect } from 'react';
import { API_URL } from '../../../config/api';

export default function useEmployeeAuth() {
    const [authStatus, setAuthStatus] = useState('loading'); // 'loading' | 'authenticated' | 'unauthenticated'

    useEffect(() => {
        fetch(`${API_URL}/auth/employee/status`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => setAuthStatus(data.authenticated ? 'authenticated' : 'unauthenticated'))
            .catch(() => setAuthStatus('unauthenticated'));
    }, []);

    return authStatus;
}
