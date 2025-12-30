/**
 * QRmodal.jsx - layout component for qr code request modal
 */

import '../css/ClientDashboard.css';
import downloadPdfQR from '../hooks/downloadPdfQR';

export default function QRmodal( {qrCode, qrCodeAddress, setQRModal} ) {
    return (
        <div className="modal-overlay2">        
              <div className="modal-content2">    
              <>
              <img src={qrCode} alt="Scan me!" />
              <div className="modal-buttons">
              <button onClick={() => downloadPdfQR(qrCode, qrCodeAddress)}>Download QR Code PDF</button>
              <button onClick={ () => setQRModal(false)}>Close QR Code</button> 
              </div>
              </>
              </div>
              </div>
    );
}