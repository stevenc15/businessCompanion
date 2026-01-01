/**
 * getQR.jsx - hook to get qr code from client on client dashboard page
 */
import { API_URL } from "../../../config/api"; 

export default async function getQR(ClientId, setQRCode) {

    const res = await fetch(`${API_URL}/admin/getQR`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({ClientId}),
      credentials: 'include',
    });

    if (res.ok){
      const data = await res.json();
      setQRCode(data.qrCode);
    }else{
      const errorData = await res.text();
      console.error('error getting qrcode: ', errorData);
    }
}