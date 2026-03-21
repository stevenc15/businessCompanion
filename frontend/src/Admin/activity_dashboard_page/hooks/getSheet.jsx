/**
 * getSheet.jsx - custom hook to fetch the Google Sheet URL for admin activities.
 * This hook makes an API call to retrieve the URL and returns it, needed
 * for displaying sheet on activity dashboard page
 */

import {useEffect} from "react";
import {useState} from "react";
import { API_URL } from "../../../config/api";

export default function GetSheet() {
    const [sheetUrl, setSheetUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/admin/dashboard/get-sheet`, {
            credentials: 'include'
        })
            .then(res => {
                if (!res.ok) throw new Error(`Failed to fetch sheet: ${res.status}`);
                return res.json();
            })
            .then(data => setSheetUrl(data.url))
            .catch(err => console.error('Failed to load sheet URL:', err))
            .finally(() => setLoading(false));
    }, []);

    return { sheetUrl, loading };
}
