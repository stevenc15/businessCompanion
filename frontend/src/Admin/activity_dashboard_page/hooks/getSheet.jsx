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
        useEffect(()=>{
            fetch(`${API_URL}/admin/dashboard/get-sheet`, {
                credentials:'include'
            })
                .then(res=>res.json())
                .then(data=>setSheetUrl(data.url));
        }, []);

    return sheetUrl;
    }
